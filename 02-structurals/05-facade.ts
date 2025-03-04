/**
 * ! Facade Pattern
 * This pattern provides a unified interface for a set of interfaces
 * in a subsystem.
 *
 * Facade defines a higher-level interface that makes the subsystem
 * easier to use.
 *
 * * It is useful when a subsystem is complex or difficult to understand
 * * to provide a simplified interface for the client.
 *
 * https://refactoring.guru/design-patterns/facade
 */

import { COLORS } from '../helpers/colors.ts';

class Projector {
  turnOn() {
    console.log('%cProjector turned on 💡', COLORS.yellow);
  }

  turnOff() {
    console.log('%cProjector turned off 📴', COLORS.gray);
  }
}

class SoundSystem {
  on() {
    console.log('%cSound system on 🔊', COLORS.yellow);
  }

  off() {
    console.log('%cSound system off 🔇', COLORS.gray);
  }
}

class VideoPlayer {
  on() {
    console.log('%cSound system on 🎥', COLORS.yellow);
  }

  play(movie: string) {
    console.log(`%cPlaying 🎬: ${movie}`, COLORS.green);
  }

  stop() {
    console.log('%cMovie stopped 🛑', COLORS.red);
  }

  off() {
    console.log('%cSound system off 📴', COLORS.gray);
  }
}

class PopcornMaker {
  cookPopcorn() {
    console.log('%cCooking popcorn 🍿', COLORS.yellow);
  }

  stopCookingPopcorn() {
    console.log('%cCooking popcorn stopped 🛑', COLORS.red);
  }
}

interface HomeTheaterFacadeOptions {
  videoplayer: VideoPlayer;
  soundSystem: SoundSystem;
  projector: Projector;
  popcornMaker: PopcornMaker;
}

class HomeTheatherFacade {
  private videoplayer: VideoPlayer;
  private soundSystem: SoundSystem;
  private projector: Projector;
  private popcornMaker: PopcornMaker;

  constructor({
    videoplayer,
    soundSystem,
    projector,
    popcornMaker,
  }: HomeTheaterFacadeOptions) {
    this.videoplayer = videoplayer;
    this.soundSystem = soundSystem;
    this.projector = projector;
    this.popcornMaker = popcornMaker;
  }
  watchMovie(movie: string): void {
    console.log('%cGetting ready to watch movie', COLORS.blue);
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.cookPopcorn();
    this.videoplayer.on();
    this.videoplayer.play(movie);

    console.log('%cEnjoy the movie', COLORS.blue);
  }

  stopWatchingMovie(): void {
    console.log('%cStopping watch movie', COLORS.red);
    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.stopCookingPopcorn();
    this.videoplayer.stop();
    this.videoplayer.off();

    console.log('%cMovie theater has been turned off', COLORS.green);
  }
}

function main() {
  const movieNight = new HomeTheatherFacade({
    projector: new Projector(),
    soundSystem: new SoundSystem(),
    videoplayer: new VideoPlayer(),
    popcornMaker: new PopcornMaker(),
  });

  movieNight.watchMovie('Spiderman');

  console.log('\n\nI am bored I will turn off the movie\n\n');

  movieNight.stopWatchingMovie();
}

main();
