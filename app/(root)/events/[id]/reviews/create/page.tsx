import ReviewForm from "@/components/shared/ReviewForm";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";

const CreateReview = ({ params: { id }, searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  console.log(id)

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Review</h3>
      </section>

      <div className="wrapper my-8">
        <ReviewForm userId={userId} type="Create" eventId={id}/>
      </div>
    </>
  )
}

export default CreateReview