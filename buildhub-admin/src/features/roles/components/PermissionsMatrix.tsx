import { Permission, PermissionAction } from "../types/role";

interface PermissionsMatrixProps {
  permissions: Permission[];
  editable?: boolean;
  onChange?: (permissions: Permission[]) => void;
}

const actions: PermissionAction[] = [
  "view",
  "create",
  "update",
  "delete",
  "manage",
];

const PermissionsMatrix = ({
  permissions,
  editable = true,
  onChange,
}: PermissionsMatrixProps) => {
  const togglePermission = (
    moduleName: string,
    action: PermissionAction
  ) => {
    if (!editable || !onChange) return;

    const updated = permissions.map((permission) => {
      if (permission.module !== moduleName) return permission;

      const hasPermission = permission.actions.includes(action);

      return {
        ...permission,
        actions: hasPermission
          ? permission.actions.filter((a) => a !== action)
          : [...permission.actions, action],
      };
    });

    onChange(updated);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

      <div className="overflow-x-auto">

        <table className="min-w-[900px] w-full">

          <thead className="bg-zinc-950">

            <tr className="border-b border-zinc-800">

              <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-400">
                Module
              </th>

              {actions.map((action) => (
                <th
                  key={action}
                  className="px-6 py-5 text-center text-sm font-semibold capitalize text-zinc-400"
                >
                  {action}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {permissions.map((permission) => (

              <tr
                key={permission.module}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >

                <td className="px-6 py-5 font-medium text-white">
                  {permission.module}
                </td>

                {actions.map((action) => {

                  const checked =
                    permission.actions.includes(action);

                  return (
                    <td
                      key={action}
                      className="px-6 py-5 text-center"
                    >

                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={!editable}
                        onChange={() =>
                          togglePermission(
                            permission.module,
                            action
                          )
                        }
                        className="h-5 w-5 cursor-pointer rounded border-zinc-700 bg-zinc-950 accent-cyan-500 disabled:cursor-not-allowed"
                      />

                    </td>
                  );

                })}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PermissionsMatrix;