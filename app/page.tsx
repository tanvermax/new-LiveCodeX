
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import LanguageSelector from "@/component/shared/LanguageSelector";
import Banner from "../component/Banner";
import Courses from "@/component/Courses";
import Testimonials from "@/component/Testimonials";
import Feature from "@/component/Feature";
import CodeEditor from "@/component/shared/CodeEditor";

export default function Home() {
  return (
    
    <div className="p-4">
      
      <Banner />

      <Courses />
      <Testimonials />
      <Feature />
      
    </div>
  );
}





