import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "ImgBB API key is not configured.",
        },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Image file is required.",
        },
        { status: 400 },
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only JPG, PNG and WEBP images are allowed.",
        },
        { status: 400 },
      );
    }

    const maxSize = 5 * 1024 * 1024;

    if (image.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Image size must be less than 5MB.",
        },
        { status: 400 },
      );
    }

    const imgbbFormData = new FormData();

    imgbbFormData.append("image", image, image.name);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: imgbbFormData,
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            result.error?.message || "Image upload failed.",
        },
        { status: response.status || 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully.",
      data: {
        url: result.data.url,
        displayUrl: result.data.display_url,
        deleteUrl: result.data.delete_url,
      },
    });
  } catch (error) {
    console.error("ImgBB Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while uploading image.",
      },
      { status: 500 },
    );
  }
}