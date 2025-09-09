import { z } from "zod";

export const ProductSchema = z.object({
  id: z.any().optional(),
  name: z
    .string({ required_error: "Majburiy maydon!" })
    .min(1, "Majburiy maydon!"),
  quantity: z
    .string({ required_error: "Majburiy maydon!" })
    .min(1, "Majburiy maydon!"),
  price: z.coerce
    .number({
      invalid_type_error: "Majburiy maydon!",
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
  currency: z.any().optional(),
  vat: z.coerce.number().optional(),
});

export const LoadSchema = z.object({
  name: z
    .string({ required_error: "Majburiy maydon!" })
    .min(1, "Majburiy maydon!"),
  price: z
    .string({ required_error: "Majburiy maydon!" })
    .min(1, "Majburiy maydon!"),
  currency: z.any(),
  companyINN: z.coerce
    .number({
      required_error: "Majburiy maydon!",
      invalid_type_error: "Faqat raqamlardan tashkil topishi kerak!",
    })
    .min(1, "Majburiy maydon!"),
  companyName: z
    .string({ required_error: "Majburiy maydon!" })
    .min(1, "Majburiy maydon!"),
  driverName: z
    .string({ required_error: "Majburiy maydon!" })
    .min(1, "Majburiy maydon!"),
  driverPhone: z
    .string({ required_error: "Majburiy maydon!" })
    .min(1, "Majburiy maydon!"),
  driverCarNumber: z
    .string({ required_error: "Majburiy maydon!" })
    .min(1, "Majburiy maydon!"),
  acceptedAmount: z.coerce.number().optional(),
  acceptedAmountCurrency: z.any().optional(),
  comment: z.string().optional(),
  products: z.array(ProductSchema).optional(),
});

export const AuthSchema = z.object({
  username: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
  password: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
});

export const UserSchema = z.object({
  name: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
  username: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
  password: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
  role: z
    .string({ required_error: "Majburiy maydon!" })
    .min(1, "Majburiy maydon!"),
  tgChatId: z.coerce
    .number({
      invalid_type_error: "Faqat raqamlardan tashkil topishi kerak!",
      required_error: "Majburiy maydon!",
    })
    .optional(),
});

export const SavedProductSchema = z.object({
  name: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
});

export const DriverSchema = z.object({
  name: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
  phone: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
  carNumber: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
});

export const CompanySchema = z.object({
  name: z
    .string({
      required_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
  tin: z.coerce
    .number({
      required_error: "Majburiy maydon!",
      invalid_type_error: "Raqamlardan tashkil topishi kerak!",
    })
    .min(1, "Majburiy maydon!"),
});

export const ConfirmLoadSchema = z.object({
  acceptedAmount: z.coerce
    .number({
      required_error: "Majburiy maydon!",
      invalid_type_error: "Majburiy maydon!",
    })
    .min(1, "Majburiy maydon!"),
  comment: z.string().optional(),
  currency: z.any(),
});
