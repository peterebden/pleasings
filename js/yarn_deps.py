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
%s
    ],
)
"""


def add_deps(children, deps):
    for child in children or []:
        name, _, version = child['name'].partition('@')
        if name in deps:
            existing_version, _ = deps[name]
            if existing_version != version:
                raise ValueError('Got conflicting versions for for %s (%s vs. %s)' %
                                 (name, version, existing_version))
        else:
            deps[name] = (version, list(add_deps(child.get('children'), deps)))
        yield name


def main():
    data = json.load(sys.stdin)
    deps = {}
    list(add_deps(data['data']['trees'], deps))
    for pkg, (version, deps) in sorted(data.items()):
        if deps:
            sys.stdout.write(DEPS_TEMPLATE % (pkg, version, '\n'.join("        ':%s',\n" % dep for dep in deps)))
        else:
            sys.stdout.write(NO_DEPS_TEMPLATE % (pkg, version))


if __name__ == '__main__':
    main()
