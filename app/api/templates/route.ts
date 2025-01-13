/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import axios from "@/app/api/axios";

export const GET = async (req: NextRequest) => {
  try {
    const response = await axios.get(`/api/templates`, {
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
