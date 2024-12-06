'use client'

import HeaderEditMarketingPost from "../../Marketing/MarketingArticle/Add/headerEditPost";
import EditMarketingPost from "../../Marketing/MarketingArticle/Add/editPost";
import { useSearchParams } from "next/navigation";

const EditPost: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");


  return (
    <>
      <HeaderEditMarketingPost />
      <EditMarketingPost id={`${id}`} />
    </>
  );
};

export default EditPost;
