import { NextRequest, NextResponse } from "next/server";

type slab = {
  slabId: number;
  fixTax: number;
  taxRate: number;
};

const taxSlab: slab[] = [
  { slabId: 1, fixTax: 0, taxRate: 0 },
  { slabId: 2, fixTax: 5, taxRate: 0.1 },
];

export async function GET(request: NextRequest) {
  return NextResponse.json({
    taxSlab,
  });
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  const fixTax = req.fixTax;
  const taxRate = req.taxRate;
  // Generate a unique slabId value

  const slabId =
    taxSlab.length > 0 ? taxSlab[taxSlab.length - 1].slabId + 1 : 1;
  // Create a new tax slab object with the extracted data and the generated slabId

  const newSlab = { slabId, fixTax, taxRate };
  // Add the new tax slab to the end of the taxSlab array

  taxSlab.push(newSlab);

  return NextResponse.json({
    Message: `New tax slab added successfully with slabId ${slabId}`,
    RequestType: "PUT",
    taxSlab,
  });
}

export async function PUT(request: NextRequest) {
  const req = await request.json();
  const fixTax = req.fixTax;
  const taxRate = req.taxRate;
  const slabId = req.slabId;

  // Find the index of the element to be updated based on the slabId
  const index = taxSlab.findIndex((slab) => slab.slabId === slabId);

  if (index !== -1) {
    // Create a new tax slab object with the extracted data and the existing slabId
    const updatedSlab = { slabId, fixTax, taxRate };
    // Replace the existing tax slab with the updated tax slab at the found index
    taxSlab.splice(index, 1, updatedSlab);

    return NextResponse.json({
      Message: `Tax slab with slabId ${slabId} updated successfully`,
      RequestType: "PUT",
      taxSlab,
    });
  } else {
    return new NextResponse(`Tax slab with slabId ${slabId} not found`);
  }
}

// to delete any tax slab from the array "taxSlab" provide slabId as a searchParam instead of json body.
export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  const slabId = Number(url.searchParams.get("slabId"));

  const index = taxSlab.findIndex((slab) => slab.slabId === slabId);
  if (index === -1) {
    return new NextResponse(`No element found with slabId ${slabId}`);
  }

  taxSlab.splice(index, 1);

  return NextResponse.json({
    Message: `Tax slab with slabId ${slabId} deleted successfully`,
    RequestType: "DELETE",
    taxSlab,
  });
}
