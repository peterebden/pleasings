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


def main():
    data = json.load(sys.stdin)
    for item in data['data']['trees']:
        name, _, version = item['name'].partition('@')
        deps = [child['name'].split('@')[0] for child in item.get('children', [])]
        if deps:
            sys.stdout.write(DEPS_TEMPLATE % (name, version, ''.join("        ':%s',\n" % dep for dep in deps)))
        else:
            sys.stdout.write(NO_DEPS_TEMPLATE % (name, version))


if __name__ == '__main__':
    main()
