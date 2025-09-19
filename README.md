theme-destroyer-3000
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/theme-destroyer-3000.svg)](https://npmjs.org/package/theme-destroyer-3000)
[![Downloads/week](https://img.shields.io/npm/dw/theme-destroyer-3000.svg)](https://npmjs.org/package/theme-destroyer-3000)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g theme-destroyer-3000
$ themedestroyer COMMAND
running command...
$ themedestroyer (--version)
theme-destroyer-3000/0.0.0 darwin-arm64 node-v23.8.0
$ themedestroyer --help [COMMAND]
USAGE
  $ themedestroyer COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`themedestroyer hello PERSON`](#themedestroyer-hello-person)
* [`themedestroyer hello world`](#themedestroyer-hello-world)
* [`themedestroyer help [COMMAND]`](#themedestroyer-help-command)
* [`themedestroyer plugins`](#themedestroyer-plugins)
* [`themedestroyer plugins add PLUGIN`](#themedestroyer-plugins-add-plugin)
* [`themedestroyer plugins:inspect PLUGIN...`](#themedestroyer-pluginsinspect-plugin)
* [`themedestroyer plugins install PLUGIN`](#themedestroyer-plugins-install-plugin)
* [`themedestroyer plugins link PATH`](#themedestroyer-plugins-link-path)
* [`themedestroyer plugins remove [PLUGIN]`](#themedestroyer-plugins-remove-plugin)
* [`themedestroyer plugins reset`](#themedestroyer-plugins-reset)
* [`themedestroyer plugins uninstall [PLUGIN]`](#themedestroyer-plugins-uninstall-plugin)
* [`themedestroyer plugins unlink [PLUGIN]`](#themedestroyer-plugins-unlink-plugin)
* [`themedestroyer plugins update`](#themedestroyer-plugins-update)

## `themedestroyer hello PERSON`

Say hello

```
USAGE
  $ themedestroyer hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ themedestroyer hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/brydonm/theme-destroyer-3000/blob/v0.0.0/src/commands/hello/index.ts)_

## `themedestroyer hello world`

Say hello world

```
USAGE
  $ themedestroyer hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ themedestroyer hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/brydonm/theme-destroyer-3000/blob/v0.0.0/src/commands/hello/world.ts)_

## `themedestroyer help [COMMAND]`

Display help for themedestroyer.

```
USAGE
  $ themedestroyer help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for themedestroyer.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.33/src/commands/help.ts)_

## `themedestroyer plugins`

List installed plugins.

```
USAGE
  $ themedestroyer plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ themedestroyer plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/index.ts)_

## `themedestroyer plugins add PLUGIN`

Installs a plugin into themedestroyer.

```
USAGE
  $ themedestroyer plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into themedestroyer.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the THEMEDESTROYER_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the THEMEDESTROYER_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ themedestroyer plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ themedestroyer plugins add myplugin

  Install a plugin from a github url.

    $ themedestroyer plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ themedestroyer plugins add someuser/someplugin
```

## `themedestroyer plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ themedestroyer plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ themedestroyer plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/inspect.ts)_

## `themedestroyer plugins install PLUGIN`

Installs a plugin into themedestroyer.

```
USAGE
  $ themedestroyer plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into themedestroyer.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the THEMEDESTROYER_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the THEMEDESTROYER_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ themedestroyer plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ themedestroyer plugins install myplugin

  Install a plugin from a github url.

    $ themedestroyer plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ themedestroyer plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/install.ts)_

## `themedestroyer plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ themedestroyer plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ themedestroyer plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/link.ts)_

## `themedestroyer plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ themedestroyer plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ themedestroyer plugins unlink
  $ themedestroyer plugins remove

EXAMPLES
  $ themedestroyer plugins remove myplugin
```

## `themedestroyer plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ themedestroyer plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/reset.ts)_

## `themedestroyer plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ themedestroyer plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ themedestroyer plugins unlink
  $ themedestroyer plugins remove

EXAMPLES
  $ themedestroyer plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/uninstall.ts)_

## `themedestroyer plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ themedestroyer plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ themedestroyer plugins unlink
  $ themedestroyer plugins remove

EXAMPLES
  $ themedestroyer plugins unlink myplugin
```

## `themedestroyer plugins update`

Update installed plugins.

```
USAGE
  $ themedestroyer plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/update.ts)_
<!-- commandsstop -->
