import { ToggleRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Dialog, DialogContent, DialogFooter } from './ui/Dialog';

interface IProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (v: boolean) => void;
  name: string;
  onDelete: () => void;
}

const ConfirmDeleteModal = ({ open, setOpen, name, onDelete }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden" showClose={false}>
        <div className="absolute -top-40 left-1/2 h-60 w-[1000px] -translate-x-1/2 rounded-[50%] bg-primary-blue" />
        <div className="absolute left-1/2 top-8 z-10 flex size-[75px] -translate-x-1/2 items-center justify-center rounded-full bg-[#D83A56]">
          <ToggleRight size={38} className="text-white" />
        </div>
        <div className="space-y-4 pt-32 text-center">
          <h3 className="text-2xl font-semibold">Konfirmasi Hapus</h3>
          <p className="text-base text-[#A4A4A4]">
            Apakah kamu yakin menghapus “
            <span className="text-primary-black">{name}</span>”?
          </p>
        </div>
        <DialogFooter className="pt-8">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={onDelete}>Hapus</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
