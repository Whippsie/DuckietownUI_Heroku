// Default values, can be changed
var pathJar="E:\\Ducky_Genie\\canardrunnable.jar";
var nameConfigFile="myConfig";
var lastclicked = "setup"; // lastclicked \in {"setup","load","config"}

// Dict used to categorize the arguments, can be edited
var dict = {"Camera":"/camera/","Localization":"localization","Navigation":"navigation", "Avoidance":"avoidance",
"LaneFollowing":"lane_following", "Apriltags":"apriltags","Control":["joystick","intersectiontype", "coordination", "visualization"], 
"Specific":["wheels", "anti_instagram", "map_name", "verbose"],"Odometry":["odometry_learning","/odometry_learning/kinematics",
"/odometry_learning/visual_odometry","odometry","/odometry/forward_kinematics"],"LED":["LED","/LED/pattern_switch",
"/LED/detector","/LED/joystick","/LED/interpreter"]}

// Do not change
var dataUser = ""; // Global variable used for asynchronous issues