import { removeAllCart } from "@/store/features/cart/cartSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { TiPrinter } from "react-icons/ti";
import { useDispatch } from "react-redux";

export default function Invoice({
  code,
  name,
  email,
  phone,
  warrantyDate,
  product,
  totalPrice,
  finalPrice,
  totalDiscount,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const handlePrint = async () => {
    // Get the invoice content element
    const invoiceContent = document.querySelector("#invoice-content");

    try {
      // Create a canvas element to render the HTML content
      const canvas = await html2canvas(invoiceContent);

      // Convert canvas to image data URL
      const imageData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Add the image to the PDF
      pdf.addImage(
        imageData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );

      const currentDate = new Date();
      const dateString = currentDate.toLocaleDateString().replaceAll("/", "-");
      const timeString = currentDate.toLocaleTimeString().replaceAll(":", "-");
      const dateTimeString = `${dateString}-${timeString}`;

      // Save the PDF with the constructed filename
      pdf.save(`invoice-${dateTimeString}.pdf`);
    } catch (error) {
      console.error("Error while generating PDF:", error);
    }
  };
   console.log(warrantyDate)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const formattedDateTime = currentDate.toLocaleString();
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once
  const dispatch = useDispatch();
  const deleteAllCart = () => {
    dispatch(removeAllCart());
    window.location.href = '/sales';
  };
  return (
    <>
      <button onClick={() => setIsModalVisible(true)}>
        <div className="bg-blue-600 hover:bg-blue-300-700 text-white font-bold py-2 px-4 rounded">
          Payment
        </div>
      </button>

      {isModalVisible && code === "200" && (
        <div
          className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalVisible(false)}
        >
          <div
            className="bg-white relative rounded-lg w-[50%] shadow-lg px-1 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex float-right justify-between items-center mb-6">
              <button
                type="button"
                className="text-teal-400  hover:text-teal-500 focus:outline-none"
                onClick={() => {
                  setIsModalVisible(false);
                  deleteAllCart();
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="font-sans antialiased bg-gray-100 p-8">
              {/* Your invoice content goes here */}
              <div
                id="invoice-content"
                class="max-w-md mx-auto bg-white shadow-md rounded-md p-6"
              >
                <div class="flex justify-between mb-4">
                  <div class="text-gray-700 font-bold">Invoice</div>
                  <div class="text-gray-500">Date: {currentDateTime}</div>
                </div>
                <div class="mb-4">
                  <div class="text-sm text-gray-500">Shop Information:</div>
                  <div class="font-bold">ហាងលក់ទូរស័ព្ទដៃ ចេក​ ស្រីណុច</div>
                  <div class="text-gray-600">
                     ត្រាំ,ដូនកែវ,តាកែវ
                  </div>
                  <div class="text-gray-600">Phone: 0966986560</div>
                  <div class="text-gray-600">Email: Nganvidy@gmail.com</div>
                </div>
                <div class="mb-4">
                  <div class="text-sm text-gray-500">Customer Information:</div>
                  <div class="font-bold">{name}</div>
                  <div class="text-gray-600">{email}</div>
                  <div class="text-gray-600">Phone: {phone}</div>
                </div>
                <div class="mb-4">
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Product Name
                          </th>
                          <th
                            scope="col"
                            class=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Quantity
                          </th>

                          <th
                            scope="col"
                            class=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {product.map((item, index) => (
                          <tr key={index}>
                            <td class=" py-4 whitespace-nowrap">
                              <div class="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                            </td>
                            <td class=" py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">
                                {item.quantity}
                              </div>
                            </td>

                            <td class=" py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">
                                ${item.price}
                              </div>
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="flex justify-between">
                    <div class="text-gray-700 font-bold">Warranty Date:</div>
                    <div class="font-bold me-5">
                      {warrantyDate[0]}
                    </div>
                  </div>
                </div>
                <hr />
                <div class="mb-1">
                  <div class="flex justify-between">
                    <div class="text-gray-700 font-bold">Sub Total:</div>
                    <div class="font-bold me-5">
                      ${(totalPrice || 0).toFixed(2)}
                    </div>
                  </div>
                </div>
                <hr />

                <div class="mb-1">
                  <div class="flex justify-between">
                    <div class="text-gray-700 font-bold">Discount:</div>
                    <div class="font-bold me-5">
                      ${(totalDiscount || 0).toFixed(2)}
                    </div>
                  </div>
                </div>
                <hr />
                <div class="mb-1">
                  <div class="flex justify-between">
                    <div class="text-gray-700 font-bold">Total Payment:</div>
                    <div class="font-bold me-5 text-green-500">
                      {" "}
                      ${(finalPrice || 0).toFixed(2)}
                    </div>
                  </div>
                </div>
                <hr />
                <div class="mb-1">
                  <h5 class="text-gray-700 font-medium">
                    Thank you for your support.
                  </h5>
                </div>
              </div>

              <div class="flex absolute right-0 me-2 justify-end">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handlePrint}
                >
                  <TiPrinter />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
