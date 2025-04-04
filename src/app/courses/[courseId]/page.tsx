import { notFound } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import CourseDetailClient from "./CourseDetailClient";

// Set up Convex client for server-side fetching
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const CourseDetailPage = async ({ params }: { params: { courseId: string } }) => {
	// Convert the courseId from string to Convex Id type
	const courseId = params.courseId as Id<"courses">;

	// Fetch course data from Convex server-side
	const courseData = await convex.query(api.courses.getCourseById, { courseId });

	if (!courseData) return notFound();

	return <CourseDetailClient courseData={courseData} courseId={courseId} />;
};

export default CourseDetailPage;
