import { v } from "convex/values";
import { query } from "./_generated/server";

export const getCourses = query({
	args: {},
	handler: async (ctx) => {
		try {
			const courses = await ctx.db.query("courses").collect();
			return courses;
		} catch (error) {
			console.log("Error getting courses", error)
			throw new Error("Error fetching courses")
		}
		
	},
});

export const getCourseById = query({
	args: { courseId: v.id("courses") },
	handler: async (ctx, args) => {
		try {
			const course = ctx.db.get(args.courseId);
			return course
		} catch (error) {
			console.log("Error fetching the course", error)
			throw new Error("Error getting the course")
		}	
	}
})