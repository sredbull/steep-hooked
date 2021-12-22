oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g steep-hooked
$ steep-hooked COMMAND
running command...
$ steep-hooked (--version)
steep-hooked/0.0.0 win32-x64 node-v17.2.0
$ steep-hooked --help [COMMAND]
USAGE
  $ steep-hooked COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`steep-hooked help [COMMAND]`](#steep-hooked-help-command)
* [`steep-hooked plugins`](#steep-hooked-plugins)
* [`steep-hooked plugins:inspect PLUGIN...`](#steep-hooked-pluginsinspect-plugin)
* [`steep-hooked plugins:install PLUGIN...`](#steep-hooked-pluginsinstall-plugin)
* [`steep-hooked plugins:link PLUGIN`](#steep-hooked-pluginslink-plugin)
* [`steep-hooked plugins:uninstall PLUGIN...`](#steep-hooked-pluginsuninstall-plugin)
* [`steep-hooked plugins update`](#steep-hooked-plugins-update)

## `steep-hooked help [COMMAND]`

Display help for steep-hooked.

```
USAGE
  $ steep-hooked help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for steep-hooked.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `steep-hooked plugins`

List installed plugins.

```
USAGE
  $ steep-hooked plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ steep-hooked plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `steep-hooked plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ steep-hooked plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ steep-hooked plugins:inspect myplugin
```

## `steep-hooked plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ steep-hooked plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ steep-hooked plugins add

EXAMPLES
  $ steep-hooked plugins:install myplugin 

  $ steep-hooked plugins:install https://github.com/someuser/someplugin

  $ steep-hooked plugins:install someuser/someplugin
```

## `steep-hooked plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ steep-hooked plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ steep-hooked plugins:link myplugin
```

## `steep-hooked plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ steep-hooked plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ steep-hooked plugins unlink
  $ steep-hooked plugins remove
```

## `steep-hooked plugins update`

Update installed plugins.

```
USAGE
  $ steep-hooked plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
