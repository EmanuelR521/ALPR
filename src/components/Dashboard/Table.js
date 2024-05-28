import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useTranslation } from "react-i18next";

const Table = ({ handleEdit, handleDelete }) => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:6970/get',{
          method: 'GET',
          headers: {
            'token': localStorage.getItem('token')
          }
        });  // Asegúrate de que la ruta sea correcta
        const data = await response.json();
        setEmployees(data.map((employee, i) => ({ ...employee, checked: false })));
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    // Llama a la función para obtener los datos
    fetchEmployees();
  }, []);

  const handleCheckboxChange = (id_) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id_ === id_ ? { ...employee, checked: !employee.checked } : employee
      )
    );
  };

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>{t("No.")}</th>
            <th>{t("Name")}</th>
            <th>{t("Plate")}</th>
            <th>{t("House")}</th>
            <th>{t("Model")}</th>
            <th>{t("In time")}</th>
            <th>{t("Out time")}</th>
            <th>{t("Inside")}</th>
            <th colSpan={2} className="text-center">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id_}>
                <td>{employee.id_}</td>
                <td>{employee.username}</td>
                <td>{employee.plate}</td>
                <td>{employee.house}</td>
                <td>{employee.model}</td>
                <td>{employee.in_time}</td>
                <td>{employee.out_time}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={employee.inside}
                    onChange={() => handleCheckboxChange(employee.id_)}
                  />
                </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id_)}
                    className="button muted-button"
                  >
                    {t("dashboard.edit")}
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id_)}
                    className="button muted-button"
                  >
                    {t("dashboard.delete_confirm_button")}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>{t("dashboard.no_users")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

