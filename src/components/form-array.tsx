import { Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { IProduct } from "@/types";

interface FormFieldArrayProps {
  form: UseFormReturn<any>;
  name: string;
  namePlaceholder?: string;
  quantityPlaceholder?: string;
  pricePlaceholder?: string;
  vatPlaceholder?: string;
  min?: number;
  allowEmpty?: boolean;
  onDelete?: (id: number) => void;
  products?: IProduct[];
  onProductSearch?: (value: string) => void;
  isProductsLoading?: boolean;
}

// Helper function to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("uz-UZ").format(value);
};

// Calculate product total (price * quantity) + VAT
const calculateProductTotal = (product: any) => {
  if (!product || !product.price || !product.quantity) return 0;

  const price = parseFloat(product.price.toString());
  const quantity = parseFloat(product.quantity.toString());
  const vat = parseFloat(product.vat?.toString() || "0");

  if (isNaN(price) || isNaN(quantity)) return 0;

  const subtotal = price * quantity;
  const vatAmount = subtotal * (vat / 100);

  return Math.round(subtotal + vatAmount);
};

export const FormFieldArray = ({
  form,
  name,
  namePlaceholder = "Nomi",
  quantityPlaceholder = "Miqdor (kg)",
  pricePlaceholder = "Narxi",
  vatPlaceholder = "QQS",
  min = 1,
  allowEmpty = false,
  onDelete,
  products = [],
  onProductSearch,
  isProductsLoading = false,
}: FormFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(
    null
  );

  const errors = form.formState.errors;
  const fieldErrors = errors[name] as any;

  const formValues = form.watch(name);

  const handleRemove = (index: number) => {
    const currentProducts = form.getValues(name);
    const productToRemove = currentProducts[index];

    if (productToRemove?.id && onDelete) {
      onDelete(productToRemove.id);
    }

    if (!allowEmpty && fields.length <= 1) {
      return;
    }

    remove(index);
  };

  const handleSelectProduct = (product: IProduct, index: number) => {
    const formProducts = form.getValues(name) || [];

    const updatedProducts = [...formProducts];

    updatedProducts[index] = {
      ...updatedProducts[index],
      id: product.id,
      name: product.name,
    };

    form.setValue(name, updatedProducts);
    setActiveSearchIndex(null);
  };

  const handleSearchFocus = (index: number) => {
    setActiveSearchIndex(index);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setActiveSearchIndex(null);
    }, 200);
  };

  return (
    <div className="space-y-2">
      {fieldErrors && fieldErrors.message && (
        <p className="text-red-500 text-xs">{fieldErrors.message}</p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col w-full mb-2 max-md:max-w-md overflow-x-auto"
        >
          <Controller
            control={form.control}
            name={`${name}.${index}.id`}
            render={({ field }) => <input type="hidden" {...field} />}
          />

          <div className="flex gap-2 items-start">
            <div className="w-full flex gap-3">
              {/* Product name with search functionality */}
              <div className="flex flex-col w-60 relative">
                <Controller
                  control={form.control}
                  name={`${name}.${index}.name`}
                  render={({ field: nameField, fieldState: { error } }) => (
                    <>
                      <Input
                        placeholder={namePlaceholder}
                        className={cn(
                          "w-full max-md:min-w-44",
                          error && "border border-red-500 focus:border-red-500"
                        )}
                        onChange={(e) => {
                          nameField.onChange(e);
                          if (onProductSearch && activeSearchIndex === index) {
                            onProductSearch(e.target.value);
                          }
                        }}
                        value={nameField.value || ""}
                        onBlur={() => {
                          nameField.onBlur();
                          handleSearchBlur();
                        }}
                        onFocus={() => handleSearchFocus(index)}
                        name={nameField.name}
                      />
                      {error && (
                        <p className="text-red-500 text-xs mt-1">
                          {error.message}
                        </p>
                      )}

                      {/* Product search results dropdown */}
                      {activeSearchIndex === index && (
                        <div className=" z-50 text-sm mt-1 top-full w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 ">
                          {isProductsLoading ? (
                            <div className="px-4 py-2">Qidirilmoqda...</div>
                          ) : products.length > 0 ? (
                            products.map((product) => (
                              <div
                                key={product.id}
                                className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                                onClick={() =>
                                  handleSelectProduct(product, index)
                                }
                              >
                                {product.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2">Mahsulot topilmadi</div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name={`${name}.${index}.quantity`}
                render={({ field: quantityField, fieldState: { error } }) => (
                  <div className="flex flex-col">
                    <input
                      placeholder={quantityPlaceholder}
                      className={cn(
                        "rounded-r-none w-32 flex min-h-[42px] h-auto rounded border border-primary/15 bg-white px-3 py-1 text-sm shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-1 focus:border-primary/40 placeholder:font-light font-normal",
                        error && "border border-red-500 focus:border-red-500"
                      )}
                      onChange={quantityField.onChange}
                      value={quantityField.value || ""}
                      onBlur={quantityField.onBlur}
                      name={quantityField.name}
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div className="flex">
                <Controller
                  control={form.control}
                  name={`${name}.${index}.price`}
                  render={({ field: priceField, fieldState: { error } }) => (
                    <div className="flex flex-col">
                      <input
                        placeholder={pricePlaceholder}
                        className={cn(
                          "rounded-r-none w-32 flex min-h-[42px] h-auto rounded border border-primary/15 bg-white px-3 py-1 text-sm shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-1 focus:border-primary/40 placeholder:font-light font-normal",
                          error && "border border-red-500 focus:border-red-500"
                        )}
                        onChange={priceField.onChange}
                        value={priceField.value || ""}
                        onBlur={priceField.onBlur}
                        name={priceField.name}
                      />
                      {error && (
                        <p className="text-red-500 text-xs mt-1">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={form.control}
                  name={`${name}.${index}.currency`}
                  render={({ field: currencyField }) => (
                    <select
                      className="h-[42px] px-1 py-2 border rounded-l-none border-l-0 rounded bg-gray-50 text-sm"
                      onChange={currencyField.onChange}
                      value={currencyField.value || "UZS"}
                      onBlur={currencyField.onBlur}
                      name={currencyField.name}
                    >
                      <option value="UZS">UZS</option>
                      <option value="USD">USD</option>
                    </select>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name={`${name}.${index}.vat`}
                render={({ field: vatField, fieldState: { error } }) => (
                  <div className="flex flex-col">
                    <Input
                      placeholder={vatPlaceholder}
                      className={cn(
                        "w-20",
                        error && "border border-red-500  focus:border-red-500"
                      )}
                      onChange={vatField.onChange}
                      value={vatField.value || ""}
                      onBlur={vatField.onBlur}
                      name={vatField.name}
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div className="h-[42px] max-md:min-w-40 w-72 flex items-center border border-primary/10 bg-gray-50 rounded px-3 text-sm font-medium">
                {formatCurrency(calculateProductTotal(formValues?.[index]))}{" "}
                {formValues?.[index]?.currency || "UZS"}
              </div>
            </div>
          </div>

          {(allowEmpty || fields.length > min) && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="flex-shrink-0 text-red-500 hover:text-red-700 h-[42px] flex items-center justify-center px-2"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            quantity: undefined,
            price: 0,
            currency: "UZS",
            vat: undefined, // Default VAT value
          })
        }
        className="inline-flex font-medium items-center text-xs text-blue-500 hover:text-blue-700 mt-2"
      >
        <Plus size={14} className="mr-1" />
        <span>qo'shish</span>
      </button>
    </div>
  );
};
