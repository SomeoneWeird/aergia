<p align="center">
	<img src="./resources/logo.png">
	<br/>
	An interactive guide to B9S + Luma on your 3DS
</p>

## What is it?

AERGIA is an electron application that is meant as both a guide, and an automator for installing B9S onto your 3DS. It will guide you through steps, as well as automate the creation and setup of your (micro)SD card.

## WIP

**tl;dr - This project is very much a work in progress. Don't use this unless you know what you're doing. Don't complain to me if it bricks your 3ds or causes armageddon.**

Styling and being pretty has come secondary to getting functionality working - although we would love your help in either case.

It currently supports selecting your device model, region, version. It then goes and downloads everything you need for soundhax, the homebrew launcher, decrypt9 and downgrading to 2.1

## Installation

Currently no prebuilt images are available as this is still very much WIP.

You can clone the repo, run `npm install` and then run `npm run dev`

## TODOs

### Styling
- [ ] navigation foldout
- [ ] build proper grid elements
- [ ] UI elements and styling
- [ ] notification styling
- [ ] Style version select dropdown
- [ ] Stop using hardcoded CSS everywhere?
- [ ] Fix layout on prompt (wifi/PG) and brick screens

### Functional
- [ ] Native app building
- [ ] Support game-based primary entrypoints
- [ ] Better SD card selector
- [ ] Soundhax entrypoint usage (before or after decrypt9+ctr screens?)
- [ ] Walkthrough for downgrading to 2.1 (+verify NAND dump?)
- [ ] B9S step w/ file downloads
- [ ] Fix react components being still active when unmounted
- [ ] Injecting FBI + setup
- [ ] SD card cleanup
- [ ] "What next?"
- [ ] Credits page
- [ ] Auto update
