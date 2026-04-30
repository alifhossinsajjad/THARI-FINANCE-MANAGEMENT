// app/user/expensiveManager/loan/page.tsx
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
  useGetAllLoansQuery,
  useAddLoanMutation,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
  type Loan as ApiLoan,
} from "@/Redux/features/userDashboardServices/expenseManager/loanApi";
import { DeleteModal } from "../income/page";

type ModalType = "add" | "edit" | "view" | "delete" | null;

type FormLoan = {
  id: number;
  title: string;
  amount: number;
  interest_rate: number;
  repayment_period: number;
  start_date: string;
};

const toNumber = (v: string | number | undefined | null) =>
  typeof v === "number" ? v : Number(v || 0);

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
        <div className="h-4 w-44 rounded bg-gray-100" />
      </td>
      <td className="px-8 py-4">
        <div className="h-4 w-20 rounded bg-gray-100" />
      </td>
      <td className="px-8 py-4">
        <div className="h-4 w-24 rounded bg-gray-100" />
      </td>
      <td className="px-8 py-4">
        <div className="h-4 w-28 rounded bg-gray-100" />
      </td>
      <td className="px-8 py-4">
        <div className="h-4 w-28 rounded bg-gray-100" />
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

export default function LoanPage() {
  const [page, setPage] = useState(1);
  const per_page = 10;

  const { data, isLoading, isFetching, isError, refetch } = useGetAllLoansQuery(
    { page, per_page },
  );

  const loans = data?.data ?? [];
  const pagination = data?.pagination;

  const [addLoan, { isLoading: isAdding }] = useAddLoanMutation();
  const [updateLoan, { isLoading: isUpdating }] = useUpdateLoanMutation();
  const [deleteLoan, { isLoading: isDeleting }] = useDeleteLoanMutation();

  const [modal, setModal] = useState<ModalType>(null);
  const [selected, setSelected] = useState<ApiLoan | null>(null);

  const openAdd = () => {
    setSelected(null);
    setModal("add");
  };

  const openEdit = (item: ApiLoan) => {
    setSelected(item);
    setModal("edit");
  };

  const openView = (item: ApiLoan) => {
    setSelected(item);
    setModal("view");
  };

  const openDelete = (item: ApiLoan) => {
    setSelected(item);
    setModal("delete");
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handleSave = async (form: FormLoan) => {
    const body = {
      title: form.title.trim(),
      amount: Number(form.amount || 0),
      interest_rate: Number(form.interest_rate || 0),
      repayment_period: Number(form.repayment_period || 0),
      start_date: form.start_date,
    };

    try {
      if (modal === "add") {
        await addLoan(body).unwrap();
      } else if (modal === "edit") {
        await updateLoan({ id: form.id, body }).unwrap();
      }
      closeModal();
    } catch {
      // optional: toast
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLoan(id).unwrap();
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
          <h1 className="text-3xl font-bold text-gray-900">Loan</h1>
          <p className="mt-1 text-sm font-medium text-gray-400">
            Smart financial planning powered by AI
          </p>
        </div>

        <button
          onClick={openAdd}
          className={`${primaryBtn} px-6 py-3 rounded-xl shadow-lg shadow-blue-900/10 inline-flex items-center gap-2`}
        >
          <Plus className="h-4 w-4" />
          Add Loan
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
                  Interest rate
                </th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider">
                  Repayment period
                </th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider">
                  Start date
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
                  <td className="px-8 py-6 text-sm text-red-600" colSpan={6}>
                    Failed to load loans.{" "}
                    <button
                      onClick={() => refetch()}
                      className="underline font-medium"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : loans.length === 0 ? (
                <tr>
                  <td className="px-8 py-10 text-sm text-gray-500" colSpan={6}>
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-[#f8f8ff] p-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          No loan found
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          Add your first loan to start tracking.
                        </p>
                      </div>

                      <button
                        onClick={openAdd}
                        className={`${primaryBtn} px-4 py-2 text-sm`}
                      >
                        Add Loan
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                loans.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#fcfcfc] transition-colors"
                  >
                    <td className="px-8 py-4 text-sm font-semibold text-gray-900">
                      {item.title}
                    </td>

                    <td className="px-8 py-4 text-sm font-semibold text-gray-900">
                      ${toNumber(item.amount)}
                    </td>

                    <td className="px-8 py-4 text-sm font-medium text-gray-900">
                      {toNumber(item.interest_rate)}%
                    </td>

                    <td className="px-8 py-4 text-sm font-medium text-gray-900">
                      {item.repayment_period} Month
                    </td>

                    <td className="px-8 py-4 text-sm font-medium text-gray-900">
                      {item.start_date}
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
        <LoanModal
          type={modal}
          data={selected}
          isSaving={isAdding || isUpdating}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {modal === "delete" && selected && (
        <DeleteModal
          title="Delete Loan"
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
/* Loan Modal (Add/Edit/View) */
/* ---------------------------------- */

function LoanModal({
  type,
  data,
  isSaving,
  onClose,
  onSave,
}: {
  type: Exclude<ModalType, "delete" | null>;
  data: ApiLoan | null;
  isSaving: boolean;
  onClose: () => void;
  onSave: (data: FormLoan) => void;
}) {
  const isView = type === "view";

  const [form, setForm] = useState<FormLoan>({
    id: data?.id ?? 0,
    title: data?.title ?? "",
    amount: data ? toNumber(data.amount) : 0,
    interest_rate: data ? toNumber(data.interest_rate) : 0,
    repayment_period: data?.repayment_period ?? 0,
    start_date: data?.start_date ?? "",
  });

  useEffect(() => {
    setForm({
      id: data?.id ?? 0,
      title: data?.title ?? "",
      amount: data ? toNumber(data.amount) : 0,
      interest_rate: data ? toNumber(data.interest_rate) : 0,
      repayment_period: data?.repayment_period ?? 0,
      start_date: data?.start_date ?? "",
    });
  }, [data]);

  const titleMap: Record<string, string> = {
    add: "Add Loan",
    edit: "Edit Loan",
    view: "View Loan",
  };

  const canSubmit =
    !isView &&
    form.title.trim().length > 0 &&
    Number.isFinite(Number(form.amount)) &&
    Number.isFinite(Number(form.interest_rate)) &&
    Number.isFinite(Number(form.repayment_period)) &&
    Number(form.repayment_period) > 0 &&
    !!form.start_date;

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
              {isView ? "Loan details" : "Fill the information below"}
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
          <div className="grid grid-cols-[160px_1fr] items-center gap-4">
            <label className={fieldLabel}>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              disabled={isView || isSaving}
              placeholder="Personal Loan"
              className={inputBase}
            />
          </div>

          <div className="grid grid-cols-[160px_1fr] items-center gap-4">
            <label className={fieldLabel}>Amount</label>
            <input
              name="amount"
              value={form.amount}
              onChange={(e) =>
                setForm((p) => ({ ...p, amount: Number(e.target.value) }))
              }
              disabled={isView || isSaving}
              type="number"
              placeholder="5000"
              className={inputBase}
            />
          </div>

          <div className="grid grid-cols-[160px_1fr] items-center gap-4">
            <label className={fieldLabel}>Interest rate</label>
            <input
              name="interest_rate"
              value={form.interest_rate}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  interest_rate: Number(e.target.value),
                }))
              }
              disabled={isView || isSaving}
              type="number"
              step="0.01"
              placeholder="5.50"
              className={inputBase}
            />
          </div>

          <div className="grid grid-cols-[160px_1fr] items-center gap-4">
            <label className={fieldLabel}>Repayment period</label>
            <input
              name="repayment_period"
              value={form.repayment_period}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  repayment_period: Number(e.target.value),
                }))
              }
              disabled={isView || isSaving}
              type="number"
              placeholder="12"
              className={inputBase}
            />
          </div>

          <div className="grid grid-cols-[160px_1fr] items-center gap-4">
            <label className={fieldLabel}>Start date</label>
            <input
              name="start_date"
              value={form.start_date}
              onChange={(e) =>
                setForm((p) => ({ ...p, start_date: e.target.value }))
              }
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
