import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { customToast, dateFormatter, getNormalizedRole } from "@/lib/utils";
import type { FC } from "react";
import type { IUser } from "@/types";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useEditUserModal, useUserStore } from "@/hooks/useZustand";
import { useUser } from "@/hooks/useAdmin";
import { queryClient } from "@/main";
import { QueryKeys } from "@/hooks/queryKeys";

type UsersTableProps = {
  users: IUser[];
  onEdit?: (user: IUser) => void;
};

const UsersTable: FC<UsersTableProps> = ({
  users,
  onEdit,
}: UsersTableProps) => {
  const editUserModal = useEditUserModal();

  const { user: userStore } = useUserStore();
  const { deleteUser } = useUser({ enabled: { list: false, single: false } });

  const handleDelete = (id: number) => {
    const isOk = confirm("O'chirib tashlanadi?");
    if (!isOk) return;

    deleteUser.mutate(id, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_USERS],
        });
        customToast("SUCCESS", "O'chirib tashlandi!");
      },
    });
  };

  if (users?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-px py-8">
        <h2 className="text-lg font-medium text-gray-700">
          Xodimlar topilmadi!
        </h2>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Ism</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Sana</TableHead>
          <TableHead>Amallar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow
            key={user.id}
            className="cursor-pointer"
            onClick={() => {
              onEdit?.(user);
              editUserModal.onOpen();
            }}
          >
            <TableCell>#{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{getNormalizedRole(user.role)}</TableCell>
            <TableCell>{dateFormatter(user.createdAt)}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <FiEdit className="text-[18px] text-amber-700 opacity-60 cursor-pointer" />

                {user?.id !== userStore?.id && (
                  <AiOutlineDelete
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user?.id);
                    }}
                    className={"text-[19px] text-destructive cursor-pointer"}
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
