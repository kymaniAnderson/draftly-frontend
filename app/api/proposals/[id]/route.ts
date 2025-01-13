/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import axios from "@/app/api/axios";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
  try {
    const { id } = await params;
    const response = await axios.get(`/api/proposals/${id}`, {
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
