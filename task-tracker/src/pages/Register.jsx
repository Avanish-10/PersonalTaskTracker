import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    async function register(e) {

        e.preventDefault();

        try {

            await api.post("/auth/register", form);

            alert("Registration Successful");

            navigate("/login");

        }
        catch (error) {

            alert(error.response?.data || "Registration Failed");

        }

    }

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">

                                Register

                            </h2>

                            <form onSubmit={register}>

                                <input
                                    className="form-control mb-3"
                                    placeholder="Username"
                                    value={form.username}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            username: e.target.value
                                        })
                                    }
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value
                                        })
                                    }
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Password"
                                    type="password"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            password: e.target.value
                                        })
                                    }
                                />

                                <button
                                    className="btn btn-success w-100"
                                >
                                    Register
                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Already have an account?

                                <Link to="/login">

                                    Login

                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;