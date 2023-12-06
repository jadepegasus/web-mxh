import React, { useState } from "react";
import Login from "./Login";
import { validateEmail, validatePassword } from "../unity/validate";
import HomePage from "../components/homePage/HomePage";
import background from "../img/backgound-thienha.jpg";
import { useRef } from "react";
import { host } from "../env";

const SignUp = () => {
  const notify = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [day, setDay] = useState("20");
  const [month, setMonth] = useState("2");
  const [year, setYear] = useState("2002");
  const [gender, setGender] = useState("other");
  const [login, setLogin] = useState(false);
  const [logined, setLogined] = useState(false);
  const [err, SetErr] = useState("");

  const handleSignup = (
    user_email,
    user_password,
    user_fullname,
    user_birthday,
    user_gender
  ) => {
    fetch(host+"/signup", {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email,
        user_password,
        user_fullname,
        user_birthday,
        user_gender,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLogined(data?.status === "success");
        if (data?.status === "fail") {
          showErr();
          SetErr(data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  const showErr = () => {
    notify.current?.classList?.remove("opacity-0");
    setTimeout(() => {
      notify.current?.classList.add("opacity-0");
    }, 4000);
  };

  if (login) return <Login />;
  if (logined) return <HomePage />;
  return (
    <div
      className="min-h-screen w-screen  bg-cover bg-black"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full h-screen  flex flex-col justify-center items-center backdrop-blur-sm">
        <div
          role="alert"
          ref={notify}
          className="alert shadow-lg fixed top-1 opacity-0 transition ease-in-out duration-1000"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">Error!</h3>
            <div className="text-xs">{err}</div>
          </div>
        </div>

        <div
          className="shadow-none sm:shadow-2xl px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 h-screen sm:h-auto rounded-md border border-gray-600"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="text-center w-full font-bold text-3xl text-white p-4">
            SIGNUP
          </div>
          <div
            className="w-full bg-gray-200 my-3"
            style={{ height: "1px" }}
          ></div>
          <div>
            <div className="flex flex-col gap-4 px-0 py-4">
              <div>
                <label className="text-white">Email address</label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="font-medium text-2xl text-gray-300 absolute p-2.5 px-3 w-11"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="py-2 pl-10 w-full outline-none border-b-2 bg-transparent text-gray-100"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {validateEmail(email) || email === "" || (
                  <p className="text-red-500 text-sm fixed text-center w-full start-0">
                    Email chưa đúng định dạng
                  </p>
                )}
              </div>
              <div>
                <label className="text-white">Password</label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="font-medium text-2xl text-gray-300 absolute p-2.5 px-3 w-11"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  className="py-2 pl-10 w-full outline-none border-b-2 bg-transparent text-gray-100"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {validatePassword(password) || password === "" || (
                  <p className="text-red-500 text-sm fixed text-center w-full start-0">
                    Mật khẩu ít nhất 8 ký tự
                  </p>
                )}
              </div>
              <div>
                <label className="text-white">Full name</label>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="font-medium text-2xl text-white absolute p-2.5 px-3 w-11"
                >
                  <path d="M16,14a6,6,0,1,1,6-6A6,6,0,0,1,16,14ZM16,4a4,4,0,1,0,4,4A4,4,0,0,0,16,4Z"></path>
                  <path d="M24,30H8a2,2,0,0,1-2-2V22a7,7,0,0,1,7-7h6a7,7,0,0,1,7,7v6A2,2,0,0,1,24,30ZM13,17a5,5,0,0,0-5,5v6H24V22a5,5,0,0,0-5-5Z"></path>
                </svg>
                <input
                  className="py-2 pl-10 w-full outline-none border-b-2 bg-transparent text-gray-100"
                  placeholder="Your name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <p className="text-white">Birthday</p>
              <div className="flex justify-around">
                <select
                  className="select select-bordered w-1/3 mx-2 bg-transparent border rounded-md text-white border-white focus:text-blue-500"
                  title="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select
                  className="select select-bordered w-1/3 mx-2 bg-transparent border rounded-md text-white border-white focus:text-blue-500"
                  title="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  className="select select-bordered w-1/3 mx-2 bg-transparent border rounded-md text-white border-white focus:text-blue-500"
                  title="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                  <option value="1979">1979</option>
                  <option value="1978">1978</option>
                  <option value="1977">1977</option>
                  <option value="1976">1976</option>
                  <option value="1975">1975</option>
                  <option value="1974">1974</option>
                  <option value="1973">1973</option>
                  <option value="1972">1972</option>
                  <option value="1971">1971</option>
                  <option value="1970">1970</option>
                  <option value="1969">1969</option>
                  <option value="1968">1968</option>
                  <option value="1967">1967</option>
                  <option value="1966">1966</option>
                  <option value="1965">1965</option>
                  <option value="1964">1964</option>
                  <option value="1963">1963</option>
                  <option value="1962">1962</option>
                  <option value="1961">1961</option>
                  <option value="1960">1960</option>
                  <option value="1959">1959</option>
                  <option value="1958">1958</option>
                  <option value="1957">1957</option>
                  <option value="1956">1956</option>
                  <option value="1955">1955</option>
                  <option value="1954">1954</option>
                  <option value="1953">1953</option>
                  <option value="1952">1952</option>
                  <option value="1951">1951</option>
                  <option value="1950">1950</option>
                  <option value="1949">1949</option>
                  <option value="1948">1948</option>
                  <option value="1947">1947</option>
                  <option value="1946">1946</option>
                  <option value="1945">1945</option>
                  <option value="1944">1944</option>
                  <option value="1943">1943</option>
                  <option value="1942">1942</option>
                  <option value="1941">1941</option>
                  <option value="1940">1940</option>
                  <option value="1939">1939</option>
                  <option value="1938">1938</option>
                  <option value="1937">1937</option>
                  <option value="1936">1936</option>
                  <option value="1935">1935</option>
                  <option value="1934">1934</option>
                  <option value="1933">1933</option>
                  <option value="1932">1932</option>
                  <option value="1931">1931</option>
                  <option value="1930">1930</option>
                  <option value="1929">1929</option>
                  <option value="1928">1928</option>
                  <option value="1927">1927</option>
                  <option value="1926">1926</option>
                  <option value="1925">1925</option>
                  <option value="1924">1924</option>
                  <option value="1923">1923</option>
                  <option value="1922">1922</option>
                  <option value="1921">1921</option>
                  <option value="1920">1920</option>
                  <option value="1919">1919</option>
                  <option value="1918">1918</option>
                  <option value="1917">1917</option>
                  <option value="1916">1916</option>
                  <option value="1915">1915</option>
                  <option value="1914">1914</option>
                  <option value="1913">1913</option>
                  <option value="1912">1912</option>
                  <option value="1911">1911</option>
                  <option value="1910">1910</option>
                  <option value="1909">1909</option>
                  <option value="1908">1908</option>
                  <option value="1907">1907</option>
                  <option value="1906">1906</option>
                  <option value="1905">1905</option>
                </select>
              </div>

              <p className="text-white">Gender</p>
              <div className="flex justify-around">
                <label className="flex border w-1/3 justify-evenly mx-2 py-1 cursor-pointer rounded-md">
                  <p className="text-white">Male</p>
                  <input
                    type="radio"
                    name="radio-7"
                    className="radio radio-info"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="flex w-1/3 border mx-2 py-1 cursor-pointer justify-evenly rounded-md">
                  <p className="text-white">Female</p>
                  <input
                    type="radio"
                    name="radio-7"
                    className="radio radio-info"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="flex w-1/3 border mx-2 py-1 cursor-pointer justify-evenly rounded-md">
                  <p className="text-white">Other</p>
                  <input
                    type="radio"
                    name="radio-7"
                    className="radio radio-info"
                    value="other"
                    checked={gender === "other"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              </div>
              <div className="w-full flex flex-row justify-end text-gray-300 hover:text-white">
                <a href="./">Forgot password</a>
              </div>
              <div className="w-full flex flex-row gap-2">
                <button
                  className="border border-white hover:bg-white hover:text-black duration-100 ease-in-out w-6/12 text-white p-0 flex flex-row justify-center items-center gap-1 rounded-md"
                  type="submit"
                  onClick={(e) => setLogin(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>{" "}
                  Login
                </button>
                <button
                  className="border border-white hover:bg-white hover:text-black duration-100 ease-in-out w-6/12 text-white p-2 flex flex-row justify-center items-center gap-1 rounded-md disabled:text-gray-200 disabled:bg-gray-300/25"
                  disabled={
                    !validateEmail(email) || !validatePassword(password)
                  }
                  onClick={() => {
                    handleSignup(
                      email,
                      password,
                      fullName,
                      `${year}-${month}-${day}`,
                      gender
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>{" "}
                  Sign-up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
