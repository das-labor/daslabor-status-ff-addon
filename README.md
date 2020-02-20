# "Das Labor" status as a WebExtension

 * http://das-labor.org/wiki/Status-Bot

## Preparation:

Install `web-ext`:

```
npm install web-ext
```

## Run

```
web-ext run
```

## Build

```
web-ext build
```

## Todo

* prettier logo
* maybe open https://das-labor.org on click
* maybe integrate http://www.das-labor.org/termine.rss if anyone wants to - see _old/
* make refresh interval configurable through "options_ui" in manifest.json

## Releasing

* Update version in `manifest.json`
* `web-ext build`
* Sign as specified further below
* create a new release on GitHub with the tag = version number, but prefixed with 'v'
* attach the .xpi to the release and copy the link to it by right clicking on the file in the release list
* add the new version to update.json, using the link you just copied

## Signing

Key and Secret can be obtained with an Mozilla Addons account.

ID has to be specified if you're not @fridtjof (I signed 0.0.1 with my account, and I think IDs are global)
```
web-ext sign --api-key="" --api-secret="" --id=""
```

