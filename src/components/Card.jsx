export const Card = ({ image, onClick, code, selected }) => {
    return (
        <img
            src={
                selected
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuAOIm-isUvjHTbxtU6s3VJlXuXVTYQlRHlsOpRjG9BmduGHeRD3k5H8Ydk_hZd0RcgC0&usqp=CAU"
                    : image
            }
            alt="card"
            width="150px"
            onClick={() => onClick(code)}
        />
    );
};
