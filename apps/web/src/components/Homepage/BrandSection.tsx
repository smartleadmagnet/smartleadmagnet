import Image from 'next/image';

const BrandSection = () => {
	return (
		<div className="brand-section py-12">
			<div className="container mx-auto">
				<div className="brands-wrapper-inner">
					<div className="brand-heading-2 mb-8">
						<h3 className="brand-heading__title text-2xl font-bold text-center">
							Trusted by the most innovative companies worldwide
						</h3>
					</div>
					<div className="brands-wrapper flex flex-wrap justify-center space-x-20">
						{Array.from(Array(5)).map((_, i) => (
							<div
								className="single-brand-2"
								key={i}
							>
								<Image
									src={`/images/home/brand-${i + 1}.png`}
									alt="brand-logo"
									width={150}
									height={50}
									layout="intrinsic"
									className="object-contain mb-10"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BrandSection;
