# Sneaky Fudger
- [Sneaky Fudger](#sneaky-fudger)
  - [Why?](#why)
  - [How do I use it?](#how-do-i-use-it)
  - [How does it work?](#how-does-it-work)
  - [How sneaky is it really?](#how-sneaky-is-it-really)
  - [Does this make me a bad GM?](#does-this-make-me-a-bad-gm)

Accidentally dropped a meteor swarm on your party and everyone is failing their death saves? Three ogres turning out to be a bit too much for your level 3 party? 

**Enter Sneaky Fudger**

With Sneaky Fudger you can fudge the underlying random number generator used by the dice so that things turn out as God intended. Any dice rolls made by you or your players will be affected.

**Use responsibly!**

*Only tested on the DND5e system, but it should work with all systems unless they modify or don't use `CONFIG.Dice.randomUniform`.*

## Why?
Me and my players enjoy most rolls and modifiers being public as it adds to the suspense and keeps some heat off me (blame the dice). Unfortunately, as a new GM I sometimes misjudge encounters and there's also only so many times you can insert a deus ex machina or nerf things before you ruin immersion. So I made this as a last resort to fix some problems I might have caused by being too careless.

## How do I use it?

Included are 4 macros, see your compendium tab:

- Restore Rolls: Restores the default behavior of the dice.
- Fudge Rolls: Modify all subsequent rolls to your liking.
- Crit hit: Makes all subsequent dice only roll the maximum value
- Crit miss: Makes all subsequent dice only roll the minimum value. 

The Fudge Rolls macro will open a dialog box where you can input two numbers: `min` and `max`. These numbers have to be between 0 and 1 and `min` should be lower or equal to `max`.

These numbers scale the range of any subsequent dice. For example: inputting `min=0.5` and `max=1` ensures that any D20 will only roll in the range `[10, 20]` and any D8 in the range `[4, 8]` etc.

When you click on the button any subsequent dice roll for you and other players will be changed until you restore them. A message will be displayed in chat **to GMs only** showing that the rolls are changed. 

## How does it work?

As far as I was able to tell, Foundry VTT does all its rolling on the client side. That means that rolls are done by each player's machine, instead of on your server. This module wraps `CONFIG.Dice.randomUniform` and communicates to each player when it should be modified.

## How sneaky is it really?

Not very and there is little I can do to change that, as long as rolls are done client-side by players (instead of all rolls being done on the server). Anyone with a bit of Javascript ability and knowledge about this module will be able to find out when dice are being messed with.

Players will also be able to see that this module is activated if they click on *View Active Modules* or see the macro compendium unless you hide it (right click -> toggle visibility).

## Does this make me a bad GM?

That's up to your players 🤷. I personally only use it as a last resort, hopefully ensuring that my players have more fun instead of less. 
