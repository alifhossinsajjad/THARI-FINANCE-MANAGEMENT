// app/user/expensiveManager/expense/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Pencil,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import {
  useGetAllExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  type Expense as ApiExpense,
} from "@/Redux/features/userDashboardServices/expenseManager/expensesApi";
import { DeleteModal } from "../income/page";

type ModalType = "add" | "edit" | "view" | "delete" | null;

type FormExpense = {
  id: number;
  title: string;
  amount: number;
  date: string; // YYYY-MM-DD (API format)
};

const amountToNumber = (a: ApiExpense["amount"]) =>
  typeof a === "number" ? a : Number(a || 0);

// ===== shared styles (match your financial tools UI) =====
const fieldLabel = "text-gray-500 text-xs font-bold uppercase tracking-wider";
const inputBase =
  "bg-[#fcfcfc] border border-gray-100 rounded-2xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed";
const primaryBtn =
  "bg-primary text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";

function SkeletonRow() {
  return (
    <tr className="border-t border-gray-100">
      <td className="px-8 py-4">
        <div className="h-4 w-52 rounded bg-gray-100" />
      </td>
      <td className="px-8 py-4">
        <div className="h-4 w-20 rounded bg-gray-100" />
      </td>
      <td className="px-8 py-4">
        <div className="h-4 w-32 rounded bg-gray-100" />
      </td>
      <td className="px-8 py-4">
        <div className="flex justify-end gap-4">
          <div className="h-4 w-4 rounded bg-gray-100" />
          <div className="h-4 w-4 rounded bg-gray-100" />
          <div className="h-4 w-4 rounded bg-gray-100" />
        </div>
      </td>
    </tr>
  );
}

export default function ExpensePage() {
  const [page, setPage] = useState(1);
  const per_page = 10;

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAllExpensesQuery({ page, per_page });

  const expenses = data?.data ?? [];
  const pagination = data?.pagination;

  const [addExpense, { isLoading: isAdding }] = useAddExpenseMutation();
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation();
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();

  const [modal, setModal] = useState<ModalType>(null);
  const [selected, setSelected] = useState<ApiExpense | null>(null);

  const openAdd = () => {
    setSelected(null);
    setModal("add");
  };

  const openEdit = (item: ApiExpense) => {
    setSelected(item);
    setModal("edit");
  };

  const openView = (item: ApiExpense) => {
    setSelected(item);
    setModal("view");
  };

  const openDelete = (item: ApiExpense) => {
    setSelected(item);
    setModal("delete");
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleSave = async (form: FormExpense) => {
    const body = {
      title: form.title.trim(),
      amount: Number(form.amount || 0),
      date: form.date,
    };

    try {
      if (modal === "add") {
        await addExpense(body).unwrap();
      } else if (modal === "edit") {
        await updateExpense({ id: form.id, body }).unwrap();
      }
      closeModal();
    } catch {
      // optional: toast
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id).unwrap();
      closeModal();
    } catch {
      // optional: toast
    }
  };

  const pageInfo = useMemo(() => {
    if (!pagination) return { current: page, last: page };
    return { current: pagination.current_page, last: pagination.last_page };
  }, [pagination, page]);

  const canPrev = pageInfo.current > 1;
  const canNext = pageInfo.current < pageInfo.last;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense</h1>
          <p className="mt-1 text-sm font-medium text-gray-400">
            Smart financial planning powered by AI
          </p>
        </div>

        <button
          onClick={openAdd}
          className={`${primaryBtn} px-6 py-3 rounded-xl shadow-lg shadow-blue-900/10 inline-flex items-center gap-2`}
        >
          <Plus className="h-4 w-4" />
          Add Expense
        </button>
      </div>

      {/* Table Card */}
      <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100/70 text-gray-500">
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider">
                  Date
                </th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </>
              ) : isError ? (
                <tr>
                  <td className="px-8 py-6 text-sm text-red-600" colSpan={4}>
                    Failed to load expenses.{" "}
                    <button
                      onClick={() => refetch()}
                      className="underline font-medium"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : expenses.length === 0 ? (
                <tr>
                  <td className="px-8 py-10 text-sm text-gray-500" colSpan={4}>
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-[#f8f8ff] p-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          No expense found
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          Add your first expense to start tracking.
                        </p>
                      </div>

                      <button
                        onClick={openAdd}
                        className={`${primaryBtn} px-4 py-2 text-sm`}
                      >
                        Add Expense
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                expenses.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#fcfcfc] transition-colors"
                  >
                    <td className="px-8 py-4 text-sm font-semibold text-gray-900">
                      {item.title}
                    </td>

                    <td className="px-8 py-4 text-sm font-semibold text-gray-900">
                      ${amountToNumber(item.amount)}
                    </td>

                    <td className="px-8 py-4 text-sm font-medium text-gray-900">
                      {item.date}
                    </td>

                    <td className="px-8 py-4">
                      <div className="flex items-center justify-end gap-4">
                        <button
                          onClick={() => openEdit(item)}
                          title="Edit"
                          className="text-[#0066ff] hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isDeleting}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => openDelete(item)}
                          title="Delete"
                          className="text-red-500 hover:text-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => openView(item)}
                          title="View"
                          className="text-[#000080] hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isDeleting}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
          <div className="text-xs font-medium text-gray-500">
            {pagination ? (
              <>
                Page{" "}
                <span className="text-gray-900">{pagination.current_page}</span>{" "}
                of <span className="text-gray-900">{pagination.last_page}</span>{" "}
                • Total{" "}
                <span className="text-gray-900">{pagination.total}</span>
                {isFetching ? " • Updating..." : ""}
              </>
            ) : (
              <>{isFetching ? "Updating..." : " "}</>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={!canPrev}
              onClick={() => canPrev && setPage((p) => p - 1)}
              className="
                inline-flex items-center gap-2 rounded-xl border border-gray-200
                px-3 py-2 text-sm font-semibold text-gray-700
                disabled:opacity-40 disabled:cursor-not-allowed
                hover:bg-gray-50 transition
              "
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>

            <button
              disabled={!canNext}
              onClick={() => canNext && setPage((p) => p + 1)}
              className="
                inline-flex items-center gap-2 rounded-xl border border-gray-200
                px-3 py-2 text-sm font-semibold text-gray-700
                disabled:opacity-40 disabled:cursor-not-allowed
                hover:bg-gray-50 transition
              "
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {modal && modal !== "delete" && (
        <ExpenseModal
          type={modal}
          data={selected}
          isSaving={isAdding || isUpdating}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {modal === "delete" && selected && (
        <DeleteModal
          title="Delete Expense"
          description={
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {selected.title}
              </span>
              ? This action can’t be undone.
            </>
          }
          loading={isDeleting}
          onClose={closeModal}
          onConfirm={() => handleDelete(selected.id)}
        />
      )}
    </div>
  );
}

/* ---------------------------------- */
/* Expense Modal (Add/Edit/View) */
/* ---------------------------------- */

export function ExpenseModal({
  type,
  data,
  isSaving,
  onClose,
  onSave,
}: {
  type: Exclude<ModalType, "delete" | null>;
  data: ApiExpense | null;
  isSaving: boolean;
  onClose: () => void;
  onSave: (data: FormExpense) => void;
}) {
  const isView = type === "view";

  const [form, setForm] = useState<FormExpense>({
    id: data?.id ?? 0,
    title: data?.title ?? "",
    amount: data ? amountToNumber(data.amount) : 0,
    date: data?.date ?? "",
  });

  useEffect(() => {
    setForm({
      id: data?.id ?? 0,
      title: data?.title ?? "",
      amount: data ? amountToNumber(data.amount) : 0,
      date: data?.date ?? "",
    });
  }, [data]);

  const titleMap: Record<string, string> = {
    add: "Add Expense",
    edit: "Edit Expense",
    view: "View Expense",
  };

  const canSubmit =
    !isView &&
    form.title.trim().length > 0 &&
    Number.isFinite(Number(form.amount)) &&
    !!form.date;

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onMouseDown={onBackdrop}
    >
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-gray-900 font-bold">{titleMap[type]}</h2>
            <p className="mt-1 text-sm font-medium text-gray-400">
              {isView ? "Expense details" : "Fill the information below"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-50 transition"
            aria-label="Close"
            disabled={isSaving}
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <label className={fieldLabel}>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              disabled={isView || isSaving}
              placeholder="Grocery"
              className={inputBase}
            />
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <label className={fieldLabel}>Amount</label>
            <input
              name="amount"
              value={form.amount}
              onChange={(e) =>
                setForm((p) => ({ ...p, amount: Number(e.target.value) }))
              }
              disabled={isView || isSaving}
              type="number"
              placeholder="500"
              className={inputBase}
            />
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <label className={fieldLabel}>Date</label>
            <input
              name="date"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              disabled={isView || isSaving}
              type="date"
              className={inputBase}
            />
          </div>
        </div>

        {/* Footer */}
        {!isView && (
          <div className="px-6 pb-6">
            <button
              onClick={() => onSave(form)}
              disabled={!canSubmit || isSaving}
              className={`${primaryBtn} w-full py-4 text-sm`}
            >
              {isSaving ? "Saving..." : type === "add" ? "Add" : "Update"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
