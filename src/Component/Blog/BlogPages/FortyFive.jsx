import React from 'react';
import { Code } from '../../../utils/Helpers';

function FortyFive() {
    return (
        <div>
            <img
                className="max-h-[800px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/GPU_Starvation/Nvidia_Blog.jpg"
                alt="Diagnosing GPU Starvation"
            />

            <p className="mt-4">
                When we say <strong>“our application uses the GPU”</strong>, we often assume the GPU is doing most of the heavy lifting.
            </p>
            <p>But recently, while working on a video-based AI pipeline, I learned the hard way that <strong>using the GPU</strong> and <strong>utilizing the GPU efficiently</strong> are two very different things.</p>

            <p className="mt-1">
                This blog walks through how we identified a hidden performance bottleneck, what was actually slowing us down, and how we redesigned the pipeline to unlock real GPU performance.
            </p>

            <p className="font-semibold text-xl mt-8">The Problem: Fast GPU, Slow Pipeline</p>

            <p className='mt-2'>Our pipeline looked straightforward:</p>

            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
                {`Video → Decode → Preprocess → Inference → Postprocess → Encode`}
            </pre>

            <p className='mt-4'>
                We were already running inference on the GPU, so performance <strong>should</strong> have been good.
                But in reality, processing an 18-second video was taking <strong>over a minute</strong>.
            </p>

            <p >That was a red flag.</p>

            <p className="font-semibold text-xl mt-8">Step 1: Stop Guessing, Start Observing</p>
            <p className='mt-2'>Instead of optimizing blindly, we decided to <strong>observe what the system was actually doing.</strong></p>
            <p className='mt-2'>What we found was surprising:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>The GPU was active only for a <b>very short time</b></li>
                <li>After inference finished, the GPU sat <b>idle for hundreds of milliseconds</b></li>
                <li>This pattern repeated for every batch</li>
            </ul>

            <p className="mt-2">
                In other words
                <br />
            </p>
            <p className='font-semibold'>The GPU wasn’t slow — it was waiting.</p>

            <h2 className="font-semibold text-xl mt-8">Step 2: Understanding GPU Starvation</h2>

            <p className='mt-2'>The core issue turned out to be <strong>GPU starvation</strong>:</p>

            <p className='mt-2'>Here’s what was happening:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li> Video <strong>decoding</strong> was running on the CPU.</li>
                <li><strong>Pre-processing</strong> and <strong>post-processing</strong> were also CPU-based.</li>
                <li>Data was copied from CPU → GPU before inference.</li>
                <li> After inference, data was copied back from GPU → CPU</li>
            </ul>

            <p className="mt-2">
                Each copy traveled over the <strong>PCIe bus</strong>, which is <strong>much slower</strong> than GPU memory access:
            </p>

            <p className='mt-2'>So the GPU would:</p>
            <ol className="list-decimal ml-6 space-y-1">
                <li>Do inference quickly.</li>
                <li>Finish its work.</li>
                <li>Wait… and wait… while the CPU prepared the next batch.</li>
            </ol>

            <p className="font-semibold text-xl mt-8">Step 3: Moving More Work to the GPU</p>

            <p className='mt-2'>
                We moved <strong>pre-processing and post-processing</strong> onto the GPU:
            </p>

            <p className='mt-2 mb-2'>Instead of CPU-based image operations, we switched to GPU-native operations so that</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Data stayed in GPU memory.</li>
                <li>PCIe transfers were reduced.</li>
                <li>The GPU could do more than just inference.</li>
            </ul>

            <p className="mt-2">
                This single enhancement reduced overall processing time by more than <strong>5x</strong>.
            </p>

            <p className='mt-2'>But there was still room to improve.</p>
            <p className="font-semibold text-xl mt-8">Step 4: The Hidden Cost of Encode and Decode</p>

            <p className='mt-2'>Even after moving pre/post-processing to the GPU, we noticed something important:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Every batch still had <strong>CPU ↔ GPU memory copies.</strong></li>
                <li>Encoding and decoding were still CPU-bound.</li>
                <li>The CPU thread frequently entered a waiting state while data transfers completed.</li>
            </ul>
            <p className='mt-2'>This is where we realized:</p>
            <p className="mt-2 font-semibold">
                If data ever leaves the GPU mid-pipeline, you pay for it.
            </p>

            <p className="font-semibold text-xl mt-8">Step 5: Keeping the Entire Pipeline on the GPU</p>

            <p className='mt-2'>
                Modern NVIDIA GPUs include <strong>dedicated hardware units</strong> for video decoding and encoding — separate from CUDA cores.
            </p>
            <p className='mt-2'>By offloading:</p>
            <ul className='list-disc ml-6 space-y-1'>
                <li><strong>Decoding</strong> to GPU hardware</li>
                <li><strong>Encoding</strong> to GPU hardware</li>

            </ul>
            <p className='mt-2 mb-2'>We were able to keep data <strong>on the GPU from start to finish</strong>:</p>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
                {`GPU Decode → GPU Preprocess → GPU Inference → GPU Postprocess → GPU Encode`}
            </pre>

            <p className='mt-2'>The results were dramatic:</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>No more Host→Device or Device→Host memory copies per batch.</li>
                <li> GPU idle gaps nearly disappeared.</li>
                <li>Total runtime dropped to <strong>under 6 seconds</strong>.</li>
                <li>Overall speedup: <strong>11x compared to the original pipeline</strong>.</li>
            </ul>

            <p className="font-semibold text-xl mt-8">A Key Lesson: Async Isn’t Always Async</p>

            <p className='mt-2 mb-2'>One subtle but important detail we learned along the way:</p>
            <ul className='list-none space-y-1'>
                <li>={">"}Even <strong>asynchronous</strong> memory copies can block the CPU</li>
                <li>={">"}if pageable (normal) memory is used.</li>
            </ul>
            <p className='mt-2'>When that happens:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>The CPU thread enters an <strong>uninterruptible wait state</strong>.</li>
                <li>The GPU may be idle, waiting for the next instruction</li>
                <li>Latency quietly accumulates</li>
            </ul>
            <p className='mt-2'>Understanding memory types and data movement was just as important as optimizing compute.</p>

            <p className="font-semibold text-xl mt-8">What This Taught Us</p>

            <p className='mt-2'>A few takeaways that now guide how we design GPU pipelines:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><b>Inference alone on GPU is not enough</b></li>
                <li><b>Data movement is often the real bottleneck</b></li>
                <li><b>Keeping data on GPU matters more than kernel micro-optimizations</b></li>
                <li><b>Measure first, optimize second</b></li>
            </ul>
            <p className='mt-2'>Most importantly:</p>

            <p className='mt-2'> Performance problems are rarely where you expect them to be.</p>

            <p className="font-semibold text-xl mt-8">Final Thoughts</p>
            <p className='mt-2'>This experience reinforced a simple truth:</p>
            <p> GPUs are incredibly fast — but only if the rest of the system can keep up.</p>
            <p>By treating the GPU as a full pipeline processor (not just an inference engine), we unlocked performance that was already there — just waiting to be used.</p>
            <p>If you’re working on AI, video, or real-time systems, I highly recommend stepping back and asking:</p>
            <p>Where is my GPU actually waiting?</p>
            <p>Chances are, that’s where your biggest optimization lies.</p>
        </div>
    );
}

export default FortyFive;
