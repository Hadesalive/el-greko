# 🎮 Secret Easter Egg Added! 

## The Konami Code Lives On! 

I've added a fun easter egg to your restaurant app. Try entering the famous Konami Code while browsing the site:

**↑ ↑ ↓ ↓ ← → ← → B A**

(That's: Up, Up, Down, Down, Left, Right, Left, Right, B, A)

When you successfully enter the code, you'll be treated to:
- 🎊 Colorful confetti raining down
- 🎉 A special message with a discount code
- 🍕🍔🌮 Bouncing food emojis!

## How It Works

1. **Custom Hook (`/hooks/useKonamiCode.ts`)**: Listens for the key sequence
2. **Confetti Component (`/components/features/confetti.tsx`)**: Creates falling confetti pieces
3. **Secret Message (`/components/features/secret-message.tsx`)**: Shows the surprise message
4. **CSS Animations**: Added custom fall animation for the confetti

## Try It Out!

Just open your app and type the Konami Code on your keyboard. The effect lasts for 5 seconds and can be triggered again after it ends.

This easter egg is completely harmless and doesn't interfere with any existing functionality - it just adds a bit of fun and delight for users who discover it!

Happy coding! 🚀