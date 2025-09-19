# theme-destroyer-3000

A CLI tool to manage and delete Shopify themes

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/theme-destroyer-3000.svg)](https://npmjs.org/package/theme-destroyer-3000)
[![Downloads/week](https://img.shields.io/npm/dw/theme-destroyer-3000.svg)](https://npmjs.org/package/theme-destroyer-3000)

## Overview

Theme Destroyer 3000 is a powerful CLI tool that helps you manage Shopify stores and safely delete unwanted themes. It provides an interactive interface for selecting and removing themes from your Shopify stores.

## Features

- 🔐 **Secure Store Management** - Add and manage multiple Shopify stores with encrypted API token storage
- 🎯 **Interactive Theme Selection** - Use checkboxes to select which themes to delete
- 🛡️ **Safe Deletion** - Confirmation prompts before deleting themes
- 📋 **Store Listing** - View all your stores with masked API tokens for security
- ⚡ **Fast & Reliable** - Direct Shopify API integration for quick operations

## Installation

```bash
npm install -g theme-destroyer-3000
```

## Usage

### Adding a Store

Add a new Shopify store to manage:

```bash
# Add store with interactive token prompt
themedestroyer store add davidprotein-dev

# Add store with token flag
themedestroyer store add davidprotein-dev -t shpat_your_token_here
```

### Listing Stores

View all your stored stores:

```bash
themedestroyer store list
```

### Removing a Store

Remove a store from your configuration:

```bash
# Remove specific store
themedestroyer store remove davidprotein-dev

# Interactive store selection
themedestroyer store remove
```

### Deleting Themes

Run the main command to fetch and delete themes:

```bash
# Run theme deletion (interactive)
themedestroyer run

# Or just run without the command name
themedestroyer
```

## Commands

* [`themedestroyer run`](#themedestroyer-run) - Fetch themes from Shopify and delete selected ones
* [`themedestroyer store add STORE`](#themedestroyer-store-add-store) - Add a new Shopify store and API token
* [`themedestroyer store list`](#themedestroyer-store-list) - List all stored Shopify stores and their API tokens (masked)
* [`themedestroyer store remove [STORE]`](#themedestroyer-store-remove-store) - Remove a Shopify store from storage

## `themedestroyer run`

Fetch themes from Shopify and delete selected ones

```
USAGE
  $ themedestroyer run [-s <value>]

FLAGS
  -s, --store=<value>  Store name to use (if not provided, will show selection)

DESCRIPTION
  Fetch themes from Shopify and delete selected ones

EXAMPLES
  $ themedestroyer run
  $ themedestroyer run --store davidprotein-dev
```

## `themedestroyer store add STORE`

Add a new Shopify store and API token

```
USAGE
  $ themedestroyer store add STORE [-t <value>]

ARGUMENTS
  STORE  Store name (e.g., davidprotein-dev)

FLAGS
  -t, --token=<value>  API token (if not provided, will be prompted)

DESCRIPTION
  Add a new Shopify store and API token

EXAMPLES
  $ themedestroyer store add davidprotein-dev
  $ themedestroyer store add davidprotein-dev --token shpat_abc123...
```

## `themedestroyer store list`

List all stored Shopify stores and their API tokens (masked)

```
USAGE
  $ themedestroyer store list

DESCRIPTION
  List all stored Shopify stores and their API tokens (masked)

EXAMPLES
  $ themedestroyer store list
```

## `themedestroyer store remove [STORE]`

Remove a Shopify store from storage

```
USAGE
  $ themedestroyer store remove [STORE]

ARGUMENTS
  STORE  Store name to remove (if not provided, will show selection)

DESCRIPTION
  Remove a Shopify store from storage

EXAMPLES
  $ themedestroyer store remove davidprotein-dev
  $ themedestroyer store remove
```

## Security

- API tokens are stored securely in `~/.themedestroyer/config.json`
- Tokens are masked when displayed (showing only last 4 characters)
- Interactive confirmation before deleting themes
- No sensitive data is logged or transmitted

## Requirements

- Node.js >= 18.0.0
- Valid Shopify API token with theme management permissions

## Getting a Shopify API Token

1. Go to your Shopify admin panel
2. Navigate to Apps > App and sales channel settings
3. Click "Develop apps" > "Create an app"
4. Configure the app with the following permissions:
   - `read_themes`
   - `write_themes`
5. Install the app and copy the Admin API access token

## License

MIT