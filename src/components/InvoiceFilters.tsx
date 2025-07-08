export type Currency = "CLP" | "USD";
export type InjectionStatus = "all" | "injected" | "not-injected";

type InvoiceFiltersProps = {
  nameFilter: string;
  onNameFilterChange: (val: string) => void;
  currencies: Currency[];
  onCurrenciesChange: (vals: Currency[]) => void;
  injectionStatus: InjectionStatus;
  onInjectionStatusChange: (val: InjectionStatus) => void;
  onClear: () => void;
};

export default function InvoiceFilters({
  nameFilter,
  onNameFilterChange,
  currencies,
  onCurrenciesChange,
  injectionStatus,
  onInjectionStatusChange,
  onClear,
}: InvoiceFiltersProps) {
  function handleCurrencyToggle(curr: Currency) {
    if (currencies.includes(curr)) {
      if (currencies.length > 1) {
        onCurrenciesChange(currencies.filter((c) => c !== curr));
      }
    } else {
      onCurrenciesChange([...currencies, curr]);
    }
  }

  return (
    <div className="flex flex-wrap gap-6 items-end mb-4">
      <div>
        <label className="font-semibold block mb-1 text-gray-700">Nombre</label>
        <input
          type="text"
          className="border border-gray-300 bg-white rounded px-3 py-2 w-44 text-gray-800 focus:ring-2 focus:ring-indigo-200 outline-none"
          placeholder="Buscar por nombre..."
          value={nameFilter}
          onChange={(e) => onNameFilterChange(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold block mb-1 text-gray-700">
          Monedas
        </label>
        <div className="flex gap-2">
          {(["CLP", "USD"] as const).map((curr) => (
            <button
              key={curr}
              type="button"
              onClick={() => handleCurrencyToggle(curr)}
              className={
                "px-3 py-1 rounded-full border transition text-base select-none " +
                (currencies.includes(curr)
                  ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100")
              }
            >
              {curr}
              {currencies.includes(curr) && (
                <span className="ml-1 text-sm pointer-events-none">
                  &times;
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-semibold block mb-1 text-gray-700">
          Estado de inyección
        </label>
        <select
          value={injectionStatus}
          onChange={(e) =>
            onInjectionStatusChange(e.target.value as InjectionStatus)
          }
          className="border border-gray-300 rounded px-3 py-2 w-40 text-gray-700 bg-white"
        >
          <option value="all">Todos</option>
          <option value="not-injected">Pendientes</option>
          <option value="injected">Inyectados</option>
        </select>
      </div>

      <button
        className="px-5 py-2 rounded font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
        onClick={onClear}
        type="button"
      >
        Limpiar
      </button>
    </div>
  );
}
