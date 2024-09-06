import React, { useEffect } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";

const KakaoShare = ({postTitle}: { postTitle: string }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "여정, 당신의 즐거운 여행을 위한 공간",
        description: `${postTitle}을 확인하시고, 여정에서 당신의 여행을 기록해보세요!`,
        imageUrl: 'http://3.34.95.240/%EC%97%AC%EC%A0%95logo%EC%9B%90%EB%B3%B8.png',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      }
    });
  };

  return (
    <RiKakaoTalkFill onClick={handleShare} className="inline text-lg sm:text-xl" />
  );
};

export default KakaoShare;