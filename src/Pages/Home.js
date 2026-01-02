import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "React JS",
      description: "Build modern, scalable frontend applications using React.",
      price: 499,
      image: "https://wallpapercave.com/wp/wp4923981.jpg",
    },
    {
      id: 2,
      title: "DevOps",
      description: "Learn CI/CD, Docker, Kubernetes, and cloud deployment.",
      price: 699,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.RWvII1JzQWQMX7YqRlbC8AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      title: "Blockchain",
      description: "Understand decentralized apps, smart contracts, and Web3.",
      price: 899,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.Dzpbpf8MExo1LvqUTUgLVwHaE7?w=768&h=511&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Available Courses</h1>

      <div className="product-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} />
            <div className="card-body">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="price-row">
                <span className="price">₹{course.price}</span>
                <button
                  onClick={() => navigate("/cart", { state: course })}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
