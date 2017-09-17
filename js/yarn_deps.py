#!/usr/bin/python3
"""Module to take yarn's output and rewrite it into BUILD rules.

N.B. Deps probably need to be installed with --flat for now.

TODO(peterebden): Rewrite this in Javascript...

Usage:
  yarn list | yarn_deps.py >> third_party/js/BUILD
"""

import json
import sys


NO_DEPS_TEMPLATE = """
yarn_library(
    name = '%s',
    version = '%s',
)
"""


DEPS_TEMPLATE = """
yarn_library(
    name = '%s',
    version = '%s',
    deps = [
%s    ],
)
"""


def parse_name(item):
    name, _, version = item['name'].partition('@')
    return name


def read_deps(items):
    for item in items:
        name, _, version = item['name'].partition('@')
        deps = [parse_name(child) for child in item.get('children', [])]
        yield name, (version, deps)


def fix_deps(pkg, deps, seen=frozenset()):
    seen = seen | {pkg['name']}
    pkg['children'] = [fix_deps(child, deps, seen) for child in pkg.get('children', [])
                       if parse_name(child) not in seen]
    return pkg


def main():
    data = json.load(sys.stdin)
    items = dict(read_deps(data['data']['trees']))
    # This is a little ugly; we need to restrict circular dependencies, which means we have to do
    # it top-down, but the only thing giving us reliable information about where the top of the
    # tree is is the color property.
    for item in data['data']['trees']:
        if item.get('color') == 'bold':
            fix_deps(item, items)
    for name, (version, deps) in sorted(items.items()):
        if deps:
            sys.stdout.write(DEPS_TEMPLATE % (name, version, ''.join("        ':%s',\n" % dep for dep in deps)))
        else:
            sys.stdout.write(NO_DEPS_TEMPLATE % (name, version))


if __name__ == '__main__':
    main()
