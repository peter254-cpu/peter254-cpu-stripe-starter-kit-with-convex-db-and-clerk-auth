import { notFound } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import CourseDetailClient from "./CourseDetailClient";

// Set up Convex client for server-side fetching

const CourseDetailPage = async ({ params }: { params: { courseId: string } }) => {
	// Ensure courseId is correctly typed as an Id<"courses">
	const courseId = params.courseId as Id<"courses">;

	try {
		// Pass data to client-side component
		return <CourseDetailClient  courseId={courseId} />;
	} catch (error) {
		console.error("Error fetching course data:", error);
		return notFound();
	}
};

export default CourseDetailPage;


