"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import One from "@/components/images/Questions1.png";
import Two from "@/components/images/Processing1.png";
import Three from "@/components/images/Free1.png";
import Group1 from "@/components/images/Group1.png";
import Group2 from "@/components/images/Group2.png";
import Group3 from "@/components/images/Group3.png";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <span className="text-4xl font-semibold">
                      {index === 0 ? (
                        <>
                          <div className="text-center">
                            <Image
                              src={One}
                              alt="lorem"
                              width={100}
                              height={100}
                              quality={95}
                              priority
                              className="mx-auto"
                            />
                            <h1 className="md:text-medium text-sm mt-5">
                              Quizzes are a fun way to test knowledge and engage
                              users interactively
                            </h1>
                            <div className="mt-5 flex w-full justify-center">
                              <Image
                                src={Group1}
                                alt="Group1"
                                width={50}
                                height={50}
                                quality={95}
                                priority
                              />
                            </div>
                          </div>
                        </>
                      ) : index === 1 ? (
                        <>
                          <div className="text-center">
                            <Image
                              src={Two}
                              alt="lorem"
                              width={100}
                              height={100}
                              quality={95}
                              priority
                              className="mx-auto"
                            />
                            <h1 className="md:text-medium text-sm mt-5">
                              A well-designed quiz can enhance learning and
                              improve retention.
                            </h1>
                            <div className="mt-5 flex w-full justify-center">
                              <Image
                                src={Group2}
                                alt="Group2"
                                width={50}
                                height={50}
                                quality={95}
                                priority
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-center">
                            <Image
                              src={Three}
                              alt="lorem"
                              width={100}
                              height={100}
                              quality={95}
                              priority
                              className="mx-auto"
                            />
                            <h1 className="md:text-medium text-sm mt-5">
                              Quizzes provide instant feedback, making them
                              ideal for both education and entertainment.
                            </h1>
                            <div className="mt-5 flex w-full justify-center">
                              <Image
                                src={Group3}
                                alt="Group1"
                                width={50}
                                height={50}
                                quality={95}
                                priority
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </CardContent>
        </Card>
        <div className="flex flex-col mt-5 gap-4">
          <Link href={"/signIn"} className="w-full">
            <button className="h-12 w-full font-semibold bg-faidBlue text-white">
              Get Started
            </button>
          </Link>
          <Link href={"/signIn/Admin"} className="w-full">
            <button className="h-12 w-full font-semibold bg-transparent border-2 border-faidBlue text-faidBlue">
              Admin Login
            </button>
          </Link>
        </div>
      </Carousel>
    </div>
  );
}
