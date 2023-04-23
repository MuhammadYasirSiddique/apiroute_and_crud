import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  if (url.searchParams.has("salary")) {
    const salary = Number(url.searchParams.get("salary"));

    if (isNaN(salary)) {
      return new NextResponse(
        "Please provide a valid number for the Salary parameter."
      );
    } else if (salary <= 50000) {
      return new NextResponse(
        " Salary upto Rs.50,000 per month is not taxable. Tax Salb # " +
          taxSlab[0].slabId +
          " will apply"
      );
    } else if (salary > 50000) {
      return new NextResponse(
        "Your Salary Rs." +
          salary +
          " in  taxable Tax Salb # " +
          taxSlab[1].slabId +
          " will apply"
      );
    }
  } else {
    return new NextResponse(
      'Please send your name in search parameter "Salary"'
    );
  }
}
type slab = {
  slabId: number;
  fixTax: number;
  taxRate: number;
};

const taxSlab: slab[] = [
  { slabId: 1, fixTax: 0, taxRate: 0 },
  { slabId: 2, fixTax: 5, taxRate: 0.1 },
];
