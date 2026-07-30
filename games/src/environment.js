import {SCR_W, SCR_H, MAP_X, MAP_Y} from './consts.js';
import Rectangle from './rectangle';
import TaskSpace from './task_space';

class Environment {
    constructor() {
        this.rectangles = [];
        this.taskSpaces = [];

        this.addRectangles();
        this.addTaskSpaces();
    }

    shiftEnvironment(offsetX, offsetY) {
        /*
        Shift every element in the game by a certain amount,
        depending on where the screen's coordinate are (with 
        respect to (0,0)). Then, once shifted, drawing the screen
        should make it look like the background moved with respect to
        the current player's location (always the center of the screen).
        */

        // all rectangles will get shifted
        let curRectX, curRectY, curRectX2, curRectY2;
        for(let curRect of this.rectangles) {

            curRectX = curRect.coords[0];
            curRectY = curRect.coords[1];
            curRectX2 = curRect.coords[2];
            curRectY2 = curRect.coords[3];

            curRect.coords[0] = curRectX - offsetX;
            curRect.coords[1] = curRectY - offsetY;
            curRect.coords[2] = curRectX2 - offsetX;
            curRect.coords[3] = curRectY2 - offsetY;
        }

        // all task spaces will get shifted
        let curX, curY, curX2, curY2;
        for(let curTaskSpace of this.taskSpaces) {

            curX = curTaskSpace.coords[0];
            curY = curTaskSpace.coords[1];
            curX2 = curTaskSpace.coords[2];
            curY2 = curTaskSpace.coords[3];

            curTaskSpace.coords[0] = curX - offsetX;
            curTaskSpace.coords[1] = curY - offsetY;
            curTaskSpace.coords[2] = curX2 - offsetX;
            curTaskSpace.coords[3] = curY2 - offsetY;
        }
    }

    addRectangles() {
        const rectangles = [
            // upper engine and hallways
            new Rectangle([1033, 205, 1705, 501]),
            new Rectangle([1033, 587, 1423, 698]),
            new Rectangle([1540, 586, 1705, 693]),
            new Rectangle([1653, 693, 1705, 909]),
            new Rectangle([1033, 699, 1316, 843]),
            new Rectangle([1256, 842, 1313, 1210]),
            new Rectangle([926, 750, 1044, 999]),
            new Rectangle([924, 1102, 1044, 1369]),
            new Rectangle([1032, 1204, 1382, 1497]),

            // cafeteria
            new Rectangle([1783, 76, 2454, 143]),
            new Rectangle([2602, 195, 2815, 494]),
            new Rectangle([2595,592, 2890, 844]),
            new Rectangle([2207, 977, 2521, 1144]),
            new Rectangle([1795, 975, 2080, 1337]),
            new Rectangle([2503, 806, 2655, 905]),  // triangle
            new Rectangle([2398, 905, 2582, 976]),  // triangle
            new Rectangle([2403, 123, 2515, 221]), // tri
            new Rectangle([2495, 196, 2604, 319]), // tri
            new Rectangle([1683, 820, 1788, 927]), // tri
            new Rectangle([1752, 900, 1874, 1021]), // t
            new Rectangle([1638, 118, 1795, 260]),

            // cafeteria tables
            new Rectangle([1847, 269, 2018, 401]),
            new Rectangle([2235, 265, 2412, 398]),
            new Rectangle([2047, 475, 2221, 603]),
            new Rectangle([1846, 682, 2019, 809]),
            new Rectangle([2237, 684, 2408, 813]),

            // weapons area
            new Rectangle([2814, 196, 3020, 334]),
            new Rectangle([3035, 481, 3173, 560]),
            new Rectangle([3015, 558, 3214, 843]),
            new Rectangle([2987, 293, 3096, 392]),  // t
            new Rectangle([3065, 392, 3160, 482]),  // t
            new Rectangle([2813, 333, 2861, 426]),  // t?

            // navigation
            new Rectangle([3214, 738, 3433, 944]),
            new Rectangle([3433, 770, 3660, 842]),
            new Rectangle([3718, 871, 3777, 1117]),
            new Rectangle([3206, 1052, 3432, 1351]),
            new Rectangle([3580, 842, 3716, 913]),
            new Rectangle([3652, 913, 3717, 1073]),
            new Rectangle([3583, 1072, 3717, 1158]),
            new Rectangle([3432, 1158, 3729, 1224]),
            
            // O2
            new Rectangle([2820, 944, 3080, 1088]),
            new Rectangle([2521, 1026, 2887, 1138]),
            new Rectangle([2518, 958, 2581, 1027]),  // box thing 1
            new Rectangle([2644, 957, 2693, 1027]),  // box thing 2
            new Rectangle([2761, 957, 2810, 1027]),  // box thing 3

            // admin
            new Rectangle([2755, 1138, 2888, 1500]),
            new Rectangle([2350, 1438, 2852, 1546]),
            new Rectangle([2280, 1331, 2354, 1546]),
            new Rectangle([2209, 1238, 2354, 1331]),
            
            // shields
            new Rectangle([3019, 1189, 3208, 1438]),
            new Rectangle([3124, 1438, 3206, 1473]),
            new Rectangle([3018, 1417, 3204, 1548]),
            new Rectangle([3048, 1545, 3203, 1670]),
            new Rectangle([3017, 1665, 3203, 1813]),
            new Rectangle([2780, 1796, 3017, 1944]),
            new Rectangle([2720, 1750, 2780, 2002]),
            new Rectangle([2667, 1644, 2779, 1754]),
            new Rectangle([2760, 1630, 2830, 1739]),
            new Rectangle([2830, 1690, 2900, 1738]),

            // Communications room
            new Rectangle([2280, 1645, 2544, 1777]),
            new Rectangle([2280, 1766, 2317, 2024]),
            new Rectangle([1693, 2010, 2784, 2115]), // storage also
            new Rectangle([2317, 1945, 2385, 2011]),

            // Storage
            new Rectangle([997, 1836, 1786, 2030]),
            new Rectangle([1500, 1609, 1789, 1732]),
            new Rectangle([1696, 1366, 1789, 1644]),
            new Rectangle([1729, 1295, 1960, 1407]),
            new Rectangle([1947, 1486, 2176, 1769]), // big boxes in middle
            new Rectangle([1880, 1584, 1949, 1661]), // small box
            new Rectangle([1786, 1891, 1901, 2010]),  // triangle

            // lower engine
            new Rectangle([1028, 1602, 1173, 1836]),
            new Rectangle([632, 1734, 1043, 1838]),
            new Rectangle([298, 1343, 645, 1738]),
            new Rectangle([619, 1435, 948, 1608]),
            new Rectangle([1032, 1204, 1382, 1497]),
            new Rectangle([686, 1105, 805, 1365]),
            new Rectangle([561, 1206, 711, 1365]),

            // electrical
            new Rectangle([1304, 1499, 1384, 1721]),
            new Rectangle([1385, 1337, 1589, 1432]),
            new Rectangle([1316, 1082, 1819, 1225]),  // medbay also
            new Rectangle([1513, 1219, 1819, 1243]),

            // reactor
            new Rectangle([558, 749, 707, 882]),
            new Rectangle([686, 750, 797, 1000]),
            new Rectangle([330, 294, 640, 749]),  // upper engine also
            new Rectangle([0, 749, 385, 1343]),
            new Rectangle([382, 876, 456, 1124]),

            // upper engine
            new Rectangle([622, 473, 944, 641]),  // big engine thing
            new Rectangle([569, 234, 1033, 390]),
            new Rectangle([]),

            // new Rectangle([]),
        ];

        let newCoords;
        for (let rect of rectangles) {
            newCoords = [rect.coords[0] + MAP_X, 
                        rect.coords[1] + MAP_Y, 
                        rect.coords[2] + MAP_X, 
                        rect.coords[3] + MAP_Y];
            
            rect.coords = newCoords;

            this.rectangles.push(rect);
        }
    }

    addTaskSpaces() {

        let center = [1800, 250, 2500, 958];
        const taskSpaces = [


            // fix navigation
            new TaskSpace([3550, 845, 3720, 1100], 1),
            // new TaskSpace(center, 1),

            // refill gas tank
            new TaskSpace([1900, 1663, 2047, 1800], 3),
            // new TaskSpace(center, 3),
            
            // download files
            new TaskSpace([2405, 198, 2511, 300], 4),
            
            // new TaskSpace([1800, 250, 2500, 958], 4),

            // new TaskSpace([], ),
        ];

        let newCoords;
        for (let taskSpace of taskSpaces) {
            newCoords = [taskSpace.coords[0] + MAP_X, 
                        taskSpace.coords[1] + MAP_Y, 
                        taskSpace.coords[2] + MAP_X, 
                        taskSpace.coords[3] + MAP_Y];
            
            taskSpace.coords = newCoords;

            this.taskSpaces.push(taskSpace);
        }
    }
    
}

export default Environment;