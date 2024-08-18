import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const hostname = request.headers.get("host");
    if (!(process.env.NEXT_PUBLIC_APP_URL as string).includes(hostname!)) {
        return NextResponse.json({
            message: "Invalid domain",
            error: true,
        }, { status: 500 });
    };
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/api/:path*",
    ],
};