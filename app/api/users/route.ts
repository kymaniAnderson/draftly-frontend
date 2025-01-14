/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "@/app/api/axios";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const response = await axios.post(`/api/users`, body, {
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
          "There was a problem creating the user",
      },
      { status: error?.response?.status ?? 500 }
    );
  }
};
