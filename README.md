jacin
---

<p align="left">
  <img src="https://raw.githubusercontent.com/martinswiderski/jacin/master/jacin-npm-100px.png" alt="jacin"/>
</p>

*A given name for both genders. It is Spanish in origin, and is a shortened form 
of **Jacinta** or a variation on the spelling of **Jason** 
(Source: [Wikipedia](href="https://en.wikipedia.org/wiki/Jacin))*

***

### Current version

Version|Published|By|URL
--- | --- | --- | ---
**0.0.2** | **2017-04-08** | `codebloke` | [npm](https://www.npmjs.com/package/jacin)

***

[![MIT License](https://raw.githubusercontent.com/martinswiderski/jacin/master/mit-license.png)](LICENSE) [![Build Status](https://travis-ci.org/martinswiderski/jacin.svg?branch=master)](https://travis-ci.org/martinswiderski/jacin) [![npm version](https://badge.fury.io/js/jacin.svg)](https://www.npmjs.com/package/jacin)

Meet `jacin`, a `JSON`/`Javascript` objects manipulation toolkit, (among other) capable of the following:

### Features

 * Ingesting multiple data object formats, such as:
    * a native `Javascript` object
    * `JSON` format string
    * `YAML` string
    * `.ini` ~~files (limited only to section + 1 level key => value or key => values array)~~
 * Runnign selection (queries) to the objects/documents ~~and setting new values~~ using
    * ~~notation of `xpath`.~~
    * `JSONPath`
 * Exporting data to:
    * a native `Javascript` object
    * `JSON` format string
    * `YAML` string
    * `.ini` ~~files (limited only to section + 1 level key => value or key => values array)~~
 * Encrypting/decrypting
    * ~~values~~
    * or ~~whole object branches~~
    * ~~preserving native `Javascript` data type~~
 * Signing and generating check-sums for both *whole objects* and *values* (eg. for the purpose of sanity checks of encryption/dectryption chain) using
    * `CRC32` for `UTF-8` strings
    * `MD5`
    * `SHA1`
    * your `custom` functions
  * Cloning native `Javascript` objects
  * ~~Comparing values and calculation of `diff` for native `Javascript` objects~~
  
**Upcoming features:**

  * Basic `NoSQL` to `SQL` *ETL-helper* features, eg. for automating extracts from document databases like eg. `MongoDB` to `CSV` or `SQL` scripts [item [#7](https://github.com/martinswiderski/jacin/issues/7)]
  * Setting objects `immutable` with incremental, signed, timestamped change sets - incl. representation thereof in multiple `JSON` snapshots [item [#6](https://github.com/martinswiderski/jacin/issues/6)].
  
