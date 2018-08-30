public class Camera {
	private boolean /camera/raw ;
	private boolean /camera/local ;
	private boolean /camera/raw/rect ;
} 

public class Filename {
} 

public class Navigation {
	private boolean /navigation ;
	private boolean /navigation/apriltags_random ;
	private boolean /navigation/graph_planner ;
	private boolean /navigation/intersection_control ;
	private boolean /navigation/random_sr_turns ;	
} 

public class Localization {
	private boolean /localization ;
	private boolean /localization/local ;
	private boolean /localization/map_name ;
	private boolean /localization/gui ;
} 

public class Control {
	private boolean joystick ;
	private boolean intersectiontype ; //default string
	private boolean coordination ; //default
} 

public class Specific {
	private boolean visualization ;
	private boolean wheels ;
	private boolean anti_instagram ; //default
	private boolean LED ;
	private boolean map_name ; //string
	private boolean verbose ; //default
} 

public class Avoidance {
	private boolean obstacle_avoidance ;
	private boolean vehicule_avoidance ;
	private boolean parallel_avoidance ;
} 

public class LaneFollowing {
	private boolean lane_following ;
	private boolean /lane_following/stop_line_filter ;
} 

public class Apriltags {
	private boolean apriltags ;
	private boolean /apriltags/local ;
} 
