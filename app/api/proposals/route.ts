/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import axios from "@/app/api/axios";

export const GET = async (req: NextRequest) => {
  try {
    const response = await axios.get(`/api/proposals`, {
      headers: {
        Authorization: null,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.response?.message ?? "There was a problem loading data",
      },
      { status: error?.response?.status ?? 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const response = await axios.post(`/api/proposals`, body, {
      headers: {
        Authorization: null,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.response?.data?.message ??
          "There was a problem creating the proposal",
      },
      { status: error?.response?.status ?? 500 }
    );
  }
};
