import "./fancytext.css";

const enhance = (input: string, className: string) => {
  const text = input.split("");

  return text.map((value, index) => {
    return (
      <span className={className}>
        <span
          className="fancytext-inner"
          style={{ animationDelay: `${Math.random() * -5000}ms` }}
        >
          <span
            className="fancytext-letter"
            style={{ animationDelay: `${index * 1000}ms` }}
          >
            {value}
          </span>
        </span>
      </span>
    );
  });
};

const FancyText = () => {
  return (
    <body className="fancytext">
      <div id="text">
        <div id="text">
          <div className="fancytext-line">
            <p
              className="fancytext-word  fancytext-fancy"
              style={{ textAlign: "justify" }}
            >
              {enhance("Tyler", "fancytext-bounce")}
            </p>
            <p className="fancytext-word fancytext-fancy">
              {enhance("Yang", "fancytext-bounce")}
            </p>
          </div>
          <div className="fancytext-line">
            <p className="fancytext-word fancytext-fancy">
              {enhance("Tyleryan", "fancytext-outer one")}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;{enhance("@unc.edu", "fancytext-outer one")}
            </p>
          </div>

          {/* <div className="fancytext-line">
            <p className="fancytext-word">Chapel Hill</p>
          </div> */}
          <div className="fancytext-line">
            <a
              id="channel-link"
              href="https://github.com/Chickenislife6"
              target="_blank"
              className="fancytext-word fancytext-fancy"
            >
              {enhance("@Chickenislife6", "fancytext-outer zero")}
            </a>
          </div>
        </div>
      </div>
    </body>
  );
};

export { FancyText };
