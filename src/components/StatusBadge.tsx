interface IProps {
  isActive: boolean;
}

const StatusBadge = ({ isActive }: IProps) => {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-[10px] font-semibold text-white ${isActive ? 'bg-[#479F77]' : 'bg-[#D83A56]'}`}
    >
      {isActive ? 'AKTIF' : 'TIDAK AKTIF'}
    </span>
  );
};

export default StatusBadge;
