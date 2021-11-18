$(document).ready(function () {
   let maze = [
      [0, 1, 0, 1],
      [0, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
   ];

   let cords = [];
   let counter = 0;

   function generateMaze() {
      for (let i = 0; i < maze.length; i++) {
         const mazeY = maze[i];

         for (let mazeX = 0; mazeX < mazeY.length; mazeX++) {
            if (maze[i][mazeX] !== 0) {
               $(".maze").append(
                  `<div data-x="${mazeX}" data-y="${i}" class="maze__item maze-block"></div>`
               );
            } else {
               $(".maze").append(
                  `<div data-x="${mazeX}" data-y="${i}" class="maze__item normal"></div>`
               );
            }
         }
      }

      $('.maze').css('grid-template-columns', `repeat(${maze[0].length}, ${100 / maze[0].length}%)`);
   }


   // 1 obstacle
   // 2 marked cells
   // 3+ success cells

   function findPath(start, end) {
      let queue = [];

      maze[start[1]][start[0]] = 4;
      queue.push([start]);

      while (queue.length > 0) {
         let current = queue.shift();
         let curPos = current[current.length - 1];
         let directions = [
            [curPos[0] + 1, curPos[1]],
            [curPos[0], curPos[1] + 1],
            [curPos[0] - 1, curPos[1]],
            [curPos[0], curPos[1] - 1]
         ];

         for (let i = 0; i < directions.length; i++) {
            const direction = directions[i];

            if (direction[0] == end[0] && direction[1] == end[1]) {
               let successCounter = 3;
               for (let index = 0; index < current.length; index++) {
                  const element = current[index];
                  maze[element[1]][element[0]] = successCounter++;
               }

               maze[end[1]][end[0]] = successCounter;
               return current.concat([end]);
            }

            if (direction[0] < 0 || direction[0] >= maze.length
               || direction[1] < 0 || direction[1] >= maze.length
               || maze[direction[1]][direction[0]] !== 0) {

               continue;
            }

            maze[direction[1]][direction[0]] = 2;
            queue.push(current.concat([direction]));
         }
      }
   }

   function buildPath(path) {
      for (let i = 0; i < path.length; i++) {
         const pathEl = path[i];


         // Top arrow
         if (maze[pathEl[1] - 1]?.[pathEl[0]] > maze[pathEl[1]]?.[pathEl[0]]) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('top')
         }
         // top-right arrow
         if (maze[pathEl[1] + 1]?.[pathEl[0]] === maze[pathEl[1]]?.[pathEl[0]] - 1
            && maze[pathEl[1]]?.[pathEl[0] + 1] > maze[pathEl[1]]?.[pathEl[0]]) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('topRight')
         }
         // top-left arrow
         if (maze[pathEl[1]][pathEl[0]] === maze[pathEl[1]]?.[pathEl[0] - 1] - 1 &&
            maze[pathEl[1]][pathEl[0]] === maze[pathEl[1] + 1]?.[pathEl[0]] + 1) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('topLeft')
         }


         // right arrow
         if (maze[pathEl[1]][pathEl[0] + 1] > maze[pathEl[1]][pathEl[0]]) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('right')
         }
         // right-top arrow
         if (maze[pathEl[1] - 1]?.[pathEl[0]] > maze[pathEl[1]][pathEl[0]] &&
            maze[pathEl[1]]?.[pathEl[0] - 1] === maze[pathEl[1]][pathEl[0]] - 1) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('rightTop')
         }
         // right-bot arrow
         if (maze[pathEl[1]]?.[pathEl[0] - 1] === maze[pathEl[1]][pathEl[0]] - 1 &&
            maze[pathEl[1] + 1]?.[pathEl[0]] > maze[pathEl[1]][pathEl[0]]) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('rightBot')
         }


         // left arrow
         if (maze[pathEl[1]]?.[pathEl[0] - 1] > maze[pathEl[1]][pathEl[0]]) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('left')
         }
         // left-top arrow
         if (maze[pathEl[1]][pathEl[0]] === maze[pathEl[1]][pathEl[0] + 1] + 1 &&
            maze[pathEl[1]][pathEl[0]] === maze[pathEl[1] - 1][pathEl[0]] - 1) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('leftTop')
         }
         // left-bot arrow
         if (maze[pathEl[1]][pathEl[0]] === maze[pathEl[1] + 1]?.[pathEl[0]] - 1 &&
            maze[pathEl[1]][pathEl[0]] === maze[pathEl[1]]?.[pathEl[0] + 1] + 1) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('leftBot')
         }


         // bottom arrow
         if (maze[pathEl[1] + 1]?.[pathEl[0]] > maze[pathEl[1]][pathEl[0]]) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('bot')
         }
         // bot-right arrow
         if (maze[pathEl[1]][pathEl[0]] === maze[pathEl[1] - 1]?.[pathEl[0]] + 1 &&
            maze[pathEl[1]][pathEl[0]] === maze[pathEl[1]]?.[pathEl[0] + 1] - 1) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('botRight')
         }
         // bot-left arrow
         if (maze[pathEl[1]][pathEl[0]] === maze[pathEl[1] - 1]?.[pathEl[0]] + 1 &&
            maze[pathEl[1]][pathEl[0]] === maze[pathEl[1]]?.[pathEl[0] - 1] - 1) {
            $($('.maze__item')[pathEl[0] + pathEl[1] * maze.length]).addClass('botLeft')
         }
      }
   }


   $("body").on("click", ".maze__item.normal", function (e) {
      e.preventDefault();
      counter++;

      if (counter === 1) {
         $(this).addClass("start");
         cords.push([$(this).data("x"), $(this).data("y")]);
      } else if (counter === 2) {
         $(this).addClass("finish");
         cords.push([$(this).data("x"), $(this).data("y")]);

         const path = findPath(cords[0], cords[1]);
         buildPath(path)
      }
   });

   generateMaze();
});
