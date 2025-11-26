import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { IProduct } from '@/types/global';
import dayjs from 'dayjs';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (v: boolean) => void;
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  selectedProduct: IProduct | undefined;
}

interface IFormValues {
  name: string;
  price: number;
  image: FileList;
}

const ProductModal = ({
  open,
  setOpen,
  setProducts,
  selectedProduct,
}: IProps) => {
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IFormValues>();

  useEffect(() => {
    if (open && selectedProduct) {
      const { name, price, image } = selectedProduct;
      setValue('name', name);
      setValue('price', price);
      setPreviewImage(image);
    }
  }, [open, selectedProduct, setValue]);

  const handleSave = (values: IFormValues) => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                name: values.name,
                price: values.price,
                image: previewImage ?? product.image,
              }
            : product,
        ),
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: uuidv4(),
          name: values.name,
          price: values.price,
          image: previewImage ?? '/surface7.png',
          createdAt: dayjs().toISOString(),
          isActive: true,
        },
      ]);
    }
    reset();
    setOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue('image', e.target.files!, { shouldValidate: true });
    clearErrors('image');

    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        reset();
        setPreviewImage(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {!selectedProduct ? 'Tambah' : 'Ubah Data'} Produk
          </DialogTitle>
        </DialogHeader>
        <form className="mt-8" onSubmit={handleSubmit(handleSave)}>
          <div className="space-y-4">
            {previewImage ? (
              <div className="relative mx-auto size-40">
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  className="object-contain object-center"
                />
              </div>
            ) : (
              <>
                <div
                  className="flex cursor-pointer flex-col items-center justify-center gap-y-4 p-8"
                  onClick={() => uploadRef.current?.click()}
                >
                  <ImageUp size={48} className="text-primary-blue" />
                  <div className="text-xs text-text-secondary">
                    Pilih gambar dengan ratio 9:16
                  </div>
                </div>
                <Input
                  type="file"
                  ref={(element) => {
                    uploadRef.current = element;
                    register('image', {
                      required: !selectedProduct
                        ? 'Gambar produk harus diisi'
                        : false,
                    }).ref(element);
                  }}
                  name={register('image').name}
                  onChange={(e) => {
                    register('image').onChange(e);
                    handleImageChange(e);
                  }}
                  accept="image/*"
                  className="hidden"
                />
                {errors.image?.message && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.image.message}
                  </p>
                )}
              </>
            )}
            <Input
              label="Nama"
              placeholder="Masukkan nama"
              error={errors.name?.message}
              {...register('name', { required: 'Nama harus diisi' })}
            />
            <Input
              label="Harga"
              placeholder="Masukkan nomor telepon"
              error={errors.price?.message}
              type="number"
              {...register('price', { required: 'Harga harus diisi' })}
            />
          </div>
          <Button className="mt-8 w-full" type="submit">
            SIMPAN
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
