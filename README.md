# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **NAME**

Time spent: **7** hours spent in total

Link to project: https://glitch.com/edit/#!/dannyn-light-and-sound-memory-game

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [X] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [X] Game button appearance change goes beyond color (e.g. add an image)
* [X] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [X] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [X] Player can adjust the volume

## Video Walkthrough (GIF)
<img src="http://g.recordit.co/uhXe3SiD7c.gif" width=1000><br>

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
“Sound effects obtained from https://www.zapsplat.com“

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
I felt that the project was very much straightforward. I was able to implement things without much trouble. It has been a while since I worked with HTML/CSS and Javascript, but I was able to recall or relearn how to use the languages for this project/game.

If I had to mention some challenges that I faced, I would say organization has been a challenge. Going between HTML and CSS, having to go back and forth to modify the appearance became a bit more mindboggling as I implemented more features. As a result, I stopped using the Glitch IDE, and coded in Virtual Studio Code instead. I simply copy and paste the code back and forth between Glitch for full functionality. This is because I discovered that although my VS Code is able to reference images correctly when provided with a reference link, the audio files do not work the same way. Therefore the only way for me to play custom audio files is to test my code on the Glitch IDE.


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
This project has been quite fun. I typically code in Java or C so it has been a while since I got to do anything that allowed me to create and interact with some form of custom user graphic interface. After this experience, my questions about web development would be about getting exposure to how the front-end works with the back-end. I don't have experience with working with some type of database or a separate server. I would certainly love the opportunity to learn some full-stack development. 

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
Given a few more hours, I would spend more time making the user interface more attractive. Right now, I would describe my project as functional over aesthetic. I would spend more time debugging my code and trying to find bugs. One particular issue that I would fix is related to the volume. I was able to implement a volume feature that allows the player to adjust the volume. However, I had to do some workarounds. The bounds of the volume level should be [0, 1], but I have a float-point issue. In adjusting the volume, it does not adjust exactly by .10 as it should because it is not rounded. As a workaround, I simply adjusted the bounds so that the minimum volume level should be as close to 1 as possible, and as close to 10 as possible. Given the extra time, I would fix that issue.



## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright [Danny Nguyen]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
