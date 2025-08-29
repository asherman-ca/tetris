# Audio Setup for Tetris Game

## Required Audio Files

To enable music and sound effects in your Tetris game, you need to add the following audio files:

### Background Music
- **`/tetris-theme.mp3`** - The main Tetris theme music (should be placed in the `public/` folder)

### Sound Effects
Place these files in the `public/sounds/` folder:
- **`line-clear.mp3`** - Sound played when clearing lines
- **`piece-drop.mp3`** - Sound played when a piece lands
- **`piece-rotate.mp3`** - Sound played when rotating pieces
- **`game-over.mp3`** - Sound played when the game ends
- **`level-up.mp3`** - Sound played when advancing to the next level

## Where to Find Audio Files

### Free Tetris Music:
- **Tetris Theme (Korobeiniki)**: Look for royalty-free versions or create your own
- **8-bit/Chiptune style**: Websites like FreeMusicArchive, Pixabay, or similar royalty-free music sites

### Free Sound Effects:
- **Freesound.org** - Large collection of free sound effects
- **Zapsplat** - Free sound effects library
- **SoundBible** - Simple sound effects
- **8-bit sound generators** - Online tools to create retro game sounds

## Audio Format Requirements

- **Format**: MP3 (recommended) or WAV
- **Quality**: 128kbps MP3 or higher for music, 64kbps for sound effects
- **Duration**: 
  - Music: 1-3 minutes (will loop automatically)
  - Sound effects: 0.1-2 seconds

## File Structure

Your public folder should look like this:
```
public/
├── tetris-theme.mp3
├── sounds/
│   ├── line-clear.mp3
│   ├── piece-drop.mp3
│   ├── piece-rotate.mp3
│   ├── game-over.mp3
│   └── level-up.mp3
└── AUDIO_SETUP.md
```

## Testing

After adding the audio files:
1. Start the game
2. Check that music plays when the game starts
3. Verify sound effects work for game events
4. Test volume controls and mute functionality

## Troubleshooting

- **No audio**: Check browser console for errors, ensure files are in correct locations
- **Autoplay blocked**: Modern browsers may block autoplay - this is normal and expected
- **File not found**: Verify file paths and names match exactly (case-sensitive)
- **Volume issues**: Check that audio files aren't corrupted and have proper audio levels
