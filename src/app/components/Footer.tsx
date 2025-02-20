"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import Swal from "sweetalert2";
import Link from "next/link";

const Footer = () => {
  const clipboardEmail = () => {
    navigator.clipboard.writeText("webwinter04@gmail.com");
    Swal.fire({
      text: "이메일 주소가 클립보드에 복사되었습니다",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <footer className="w-full min-h-[200px] mt-auto bg-[#2F5072] px-1">
      <div className="max-w-[1200px] mx-auto py-6">
        <div className="flex-col items-center justify-between gap-4 md:flex md:flex-row">
          <div className="flex gap-[16px]">
            <Image
              src="/여정logo.png"
              alt="메인 로고"
              width={100}
              height={100}
              className="filter brightness-0 invert w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
            />
            <div>
              <p className="text-[16px] md:text-[24px] font-[600] text-[#C9C9C9]">
                <span className="text-white">여정</span>은 여러분의 여행을
                응원합니다.
              </p>
              <p className="text-[#C9C9C9] font-[100] text-[12px] md:text-[16px] leading-6">
                <span className="text-white">여정</span>과 함께 소중한 여행의
                기록들을 나눠보세요!
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[4px] items-end md:items-start">
            <h2 className="flex items-center gap-2 text-[14px] md:text-[18px] font-[600] text-[#C9C9C9]">
              webwinter04@gmail.com
              <CiLink
                className="text-2xl md:text-3xl cursor-pointer"
                onClick={clipboardEmail}
              />
            </h2>
            <p className="text-[10px] md:text-[12px] text-[#C9C9C9] font-[300]">
              AM 10:00~PM 7:00 (주말 및 공휴일 휴무)
            </p>

            <Link
              href="https://github.com/yeojeong-0824"
              target="_blank"
              aria-label="github link"
            >
              <FaGithub className="text-3xl text-[#C9C9C9]" />
            </Link>
          </div>
        </div>
        <div className="w-full h-[1px] mt-6 bg-gray-300"></div>
        <div className="h-[30px]">
          <p className="text-[#C9C9C9] text-[12px] md:text-[14px] pt-4">
            Copyright © 2025 여정. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
